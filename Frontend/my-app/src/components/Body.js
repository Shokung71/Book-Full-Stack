

"use client";
export default function Body() {
    return (
        <div className="container max-w-7xl mx-auto my-20 pb-20 px-4 pt-12">
            {/* กล่องสองกล่อง */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-blue-500">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">FOOD DELIVERY</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Model</li>
                        <li>Price</li>
                        <li>5G Network SupportX</li>
                        <li>Processor</li>
                        <li>RAM</li>
                        <li>ROM</li>
                        <li>Screen</li>
                        <li>Refresh Rate</li>
                        <li>OS</li>
                    </ul>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-blue-500">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">MART</h2>
                    {/* ใส่การล็อกอินที่นี่ */}
                </div>
            </div>
        </div>
    );
}
{/* <ul className="list-disc list-inside text-gray-700">
    <li>Model</li>
    <li>Price</li>
    <li>5G Network SupportX</li>
    <li>Processor</li>
    <li>RAM</li>
    <li>ROM</li>
    <li>Screen</li>
    <li>Refresh Rate</li>
    <li>OS</li>
</ul> */}