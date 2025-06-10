const getDashboardData = async (req, res) => {
    try {
        // Example: Fetch dashboard data from database or services
        const stats = {
            users: 120,
            posts: 45,
            comments: 300,
        };

        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getDashboardData,
};