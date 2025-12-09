const db = require('../database');

/**
 * Retrieves sales data with support for filtering, sorting, and pagination.
 * 
 * @param {Object} req - Express request object containing query parameters.
 * @param {Object} res - Express response object.
 */
const getSales = (req, res) => {
    try {
        const {
            q,
            regions,
            genders,
            categories,
            tags,
            paymentMethods,
            ageMin,
            ageMax,
            dateMin,
            dateMax,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        // Ensure page and limit are valid numbers
        const pageNum = Math.max(1, Number(page) || 1);
        const limitNum = Math.max(1, Number(limit) || 10);

        // Smart Swap for Ranges (if user inputs min > max)
        let cleanAgeMin = Number(ageMin);
        let cleanAgeMax = Number(ageMax);
        if (!isNaN(cleanAgeMin) && !isNaN(cleanAgeMax) && cleanAgeMin > cleanAgeMax) {
            [cleanAgeMin, cleanAgeMax] = [cleanAgeMax, cleanAgeMin];
        } else {
            if (isNaN(cleanAgeMin)) cleanAgeMin = ageMin ? Number(ageMin) : undefined;
            if (isNaN(cleanAgeMax)) cleanAgeMax = ageMax ? Number(ageMax) : undefined;
        }

        let cleanDateMin = dateMin;
        let cleanDateMax = dateMax;
        if (cleanDateMin && cleanDateMax && cleanDateMin > cleanDateMax) {
            [cleanDateMin, cleanDateMax] = [cleanDateMax, cleanDateMin];
        }

        /**
         * Helper to normalize array parameters from query string.
         * Handles both ?param=a,b and ?param[]=a&param[]=b formats.
         * @param {string|string[]} val 
         * @returns {string[]|null}
         */
        const parseList = (val) => {
            if (!val) return null;
            if (Array.isArray(val)) return val;
            return val.split(',').filter(item => item.trim() !== '');
        };

        let sql = "SELECT * FROM sales";
        let countSql = "SELECT COUNT(*) as total FROM sales";
        let params = [];
        let conditions = [];

        // Search
        if (q) {
            conditions.push("(customerName LIKE ? OR phoneNumber LIKE ?)");
            params.push(`%${q}%`, `%${q}%`);
        }

        // Filters (Multi-select)
        const regionList = parseList(regions);
        if (regionList && regionList.length > 0) {
            const placeholders = regionList.map(() => '?').join(',');
            conditions.push(`region IN (${placeholders})`);
            params.push(...regionList);
        }

        const genderList = parseList(genders);
        if (genderList && genderList.length > 0) {
            const placeholders = genderList.map(() => '?').join(',');
            conditions.push(`gender IN (${placeholders})`);
            params.push(...genderList);
        }

        const categoryList = parseList(categories);
        if (categoryList && categoryList.length > 0) {
            const placeholders = categoryList.map(() => '?').join(',');
            conditions.push(`category IN (${placeholders})`);
            params.push(...categoryList);
        }

        const paymentList = parseList(paymentMethods);
        if (paymentList && paymentList.length > 0) {
            const placeholders = paymentList.map(() => '?').join(',');
            conditions.push(`paymentMethod IN (${placeholders})`);
            params.push(...paymentList);
        }

        const tagList = parseList(tags);
        if (tagList && tagList.length > 0) {
            // Logic: Row matches if it has ANY of the selected tags
            // Stored as "tag1,tag2"
            const tagConditions = tagList.map(() => "tags LIKE ?").join(' OR ');
            conditions.push(`(${tagConditions})`);
            tagList.forEach(t => params.push(`%${t}%`));
        }

        // Range Filters
        if (cleanAgeMin !== undefined) {
            conditions.push("age >= ?");
            params.push(cleanAgeMin);
        }
        if (cleanAgeMax !== undefined) {
            conditions.push("age <= ?");
            params.push(cleanAgeMax);
        }

        if (cleanDateMin) {
            conditions.push("date >= ?");
            params.push(cleanDateMin);
        }
        if (cleanDateMax) {
            conditions.push("date <= ?");
            // Append end of day time to make dateMax inclusive
            params.push(cleanDateMax + 'T23:59:59.999Z');
        }

        // Construct Query
        if (conditions.length > 0) {
            const whereClause = " WHERE " + conditions.join(' AND ');
            sql += whereClause;
            countSql += whereClause;
        }

        // Sorting
        if (sort) {
            const [key, order] = sort.split(':');
            const dir = order === 'desc' ? 'DESC' : 'ASC';
            // whitelist keys to prevent injection
            const allowedSorts = ['date', 'amount', 'age', 'customerName', 'quantity', 'category', 'gender'];
            if (allowedSorts.includes(key) || key === 'transactionId') { // map transactionId if needed
                sql += ` ORDER BY ${key} ${dir}`;
            } else {
                sql += " ORDER BY date DESC, id DESC";
            }
        } else {
            sql += " ORDER BY date DESC, id DESC";
        }

        // Pagination parameters (pageNum, limitNum) are already defined at top
        const offset = (pageNum - 1) * limitNum;

        sql += " LIMIT ? OFFSET ?";
        // We add limit/offset params at the very end for the data query
        const dataParams = [...params, limitNum, offset];

        // Execute Queries
        db.get(countSql, params, (err, countResult) => {
            if (err) {
                console.error("Count Error:", err);
                return res.status(500).json({ error: "Database error" });
            }
            const total = countResult ? countResult.total : 0;

            db.all(sql, dataParams, (err, rows) => {
                if (err) {
                    console.error("Data Error:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                // Fetch Meta (distinct values)
                const metaQuery = `
                    SELECT 
                        (SELECT GROUP_CONCAT(DISTINCT region) FROM sales) as regions,
                        (SELECT GROUP_CONCAT(DISTINCT category) FROM sales) as categories,
                        (SELECT GROUP_CONCAT(DISTINCT paymentMethod) FROM sales) as paymentMethods,
                        (SELECT GROUP_CONCAT(DISTINCT tags) FROM sales) as allTags
                `;

                db.get(metaQuery, [], (err, metaResult) => {
                    let meta = {};
                    if (!err && metaResult) {
                        try {
                            meta.allRegions = metaResult.regions ? metaResult.regions.split(',') : [];
                            meta.allCategories = metaResult.categories ? metaResult.categories.split(',') : [];
                            meta.allPaymentMethods = metaResult.paymentMethods ? metaResult.paymentMethods.split(',') : [];
                            // Tags are stored combined "tag1,tag2", need to split and uniquify
                            const rawTags = metaResult.allTags ? metaResult.allTags.split(',') : [];
                            meta.allTags = [...new Set(rawTags.map(t => t.trim()).filter(t => t))];
                        } catch (e) { console.error("Meta parse error", e); }
                    }

                    res.json({
                        data: rows,
                        pagination: {
                            total,
                            page: pageNum,
                            limit: limitNum,
                            totalPages: Math.ceil(total / limitNum)
                        },
                        meta
                    });
                });
            });
        });

    } catch (error) {
        console.error("Error processing sales:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getSales };
