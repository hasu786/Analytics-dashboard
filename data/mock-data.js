// Mock Data for Dashboard
const mockData = {
    salesData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        revenue: [8500, 10200, 9800, 11000, 12500, 11800, 13400, 14200, 13800, 15200, 16800, 18500],
        orders: [120, 145, 132, 158, 175, 168, 189, 201, 194, 215, 230, 248],
        profit: [4200, 5100, 4900, 5500, 6250, 5900, 6700, 7100, 6900, 7600, 8400, 9250]
    },

    productsData: {
        labels: ['Wireless Headphones', 'Smart Watch', 'Laptop', 'Tablet', 'Gaming Console'],
        revenue: [22600, 19450, 18300, 15700, 14200],
        units: [452, 389, 305, 314, 237]
    },

    countriesData: [
        { name: 'USA', users: 1200, growth: 12, level: 'high' },
        { name: 'UK', users: 850, growth: 8, level: 'high' },
        { name: 'Germany', users: 720, growth: 6, level: 'medium' },
        { name: 'France', users: 610, growth: 5, level: 'medium' },
        { name: 'Canada', users: 540, growth: 9, level: 'high' },
        { name: 'Australia', users: 480, growth: 4, level: 'medium' },
        { name: 'Japan', users: 420, growth: 3, level: 'low' },
        { name: 'Brazil', users: 380, growth: 7, level: 'medium' },
        { name: 'India', users: 320, growth: 15, level: 'high' },
        { name: 'China', users: 290, growth: 2, level: 'low' }
    ],

    ordersData: [
        { id: '#ORD-7849', customer: 'Alex Johnson', date: '2024-03-15', amount: '$289.99', status: 'completed' },
        { id: '#ORD-7848', customer: 'Maria Garcia', date: '2024-03-14', amount: '$149.50', status: 'pending' },
        { id: '#ORD-7847', customer: 'David Smith', date: '2024-03-14', amount: '$599.99', status: 'completed' },
        { id: '#ORD-7846', customer: 'Sarah Wilson', date: '2024-03-13', amount: '$89.99', status: 'processing' },
        { id: '#ORD-7845', customer: 'James Brown', date: '2024-03-12', amount: '$199.99', status: 'completed' },
        { id: '#ORD-7844', customer: 'Lisa Taylor', date: '2024-03-12', amount: '$349.99', status: 'completed' },
        { id: '#ORD-7843', customer: 'Robert Lee', date: '2024-03-11', amount: '$129.99', status: 'pending' },
        { id: '#ORD-7842', customer: 'Emma Davis', date: '2024-03-10', amount: '$79.99', status: 'completed' }
    ],

    kpiData: {
        revenue: { value: 124580, change: 12.5 },
        orders: { value: 1842, change: 8.2 },
        users: { value: 2841, change: 5.7 },
        conversion: { value: 3.2, change: -1.1 }
    }
};

// Helper function to format currency
function formatCurrency(value) {
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Helper function to get random value within range
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}