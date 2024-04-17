// const asyncHnadler =(fn) => async (req, res, next) => {
//     try {
//       await fn(req, res, next);
//     }
//      catch (error) {
//         res.status(err.code || 500).json({
//             message: err.message || 'Something went wrong',
//             success: false
//         })
//   }
// }   (this is one method to do this , we will not do like this in this project)

import { request } from "express";

const asyncHandler = (requestHandler) => {
    async (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) =>next(err))
}
}
export {asyncHandler};