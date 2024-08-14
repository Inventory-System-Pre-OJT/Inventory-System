import { Stock } from "../models/stock.model.js"

export async function getStocks(req, res){
    try{
        const stocks = await Stock.find();
        return res.json(stocks);
    }
    catch(error){
        console.log("getStocks Controller Error", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// export async function filterStock(req, res){
//     try{

//     }
//     catch(error){
//         console.log("filterStock Controller Error", error.message);
//         res.status(500).json({ success: false, message: "Internal Server Error"})
//     }
// }

export async function searchStock(req, res){
    try{
        const query = req.body;

        const stocks = await Stock.find(query);
        return res.json(stocks);
    }
    catch(error){
        console.log("searchStock Controller Error", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

export async function postStock(req, res) {
    try {
        const {
            product_name, qty, invoice_no, desc, receiver, date, expiration_date, scan_copy, done_by, price, lot_no, metrics, type, color, pricing_model, currency, delivered_by
        } = req.body;

        // if (!product_name || !qty || !desc || !invoice_no || !date || !expiration_date || !done_by || !receiver || !price || !lot_no || !metrics || !type || !pricing_model || !currency || !delivered_by) {
        //     return res.status(400).json({ success: false, message: "All fields are required" });
        // }

        const newStock = new Stock({
            product_name, qty, invoice_no, receiver, desc, date, expiration_date, scan_copy, done_by, price, lot_no, metrics, type, color, pricing_model, currency
        });

        await newStock.save();

        return res.status(200).json({ success: true, message: "Entry successfully added" });
    } catch (error) {
        console.error("postStock Controller Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function updateStock(req, res){
    try{
        const {
            name, qty, invoice_no, desc, reciever, date, expiration_date, scan_copy, done_by, price
        } = req.body;

        const setUpdate = await Stock.findOne({ invoice_no: invoice_no });
        const id = setUpdate.id

        const updateStock = await PerformanceResourceTiming.findByIdAndUpdate(id,
            name, qty, invoice_no, desc, reciever, date, expiration_date, scan_copy, done_by, price
        )

        return res.status(200).json({ success: true, message: "Record updated successfully"})
    }
    catch(error){
        console.log("updateStock Controller Error", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function destroyStock(req, res){
    try{
        const { invoice_no } = req.body;

        if (!invoice_no) {
            return res.status(400).json({ success: false, message: "Invoice number is required" });
        }

        const result = await Stock.deleteOne({ invoice_no });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        return res.status(200).json({ success: true, message: "Record successfully deleted" });
    }
    catch(error){
        console.log("destroyStock Controller Error", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}