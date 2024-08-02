import express from 'express'
import { createVoucher,getVoucher,UpdatedVoucher,DeleteVoucher } from '../controllers/voucher.controllers.js'





const routers=express.Router()

routers.post('/create',createVoucher)
routers.get('/get',getVoucher)
routers.put('/update/:id',UpdatedVoucher)
routers.delete('/delete/:id',DeleteVoucher)



export default routers