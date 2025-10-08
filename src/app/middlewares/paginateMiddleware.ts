import { Request,Response,NextFunction } from "express"

const paginateMiddleware = (modal:any)=>{
return async (req: Request, res: Response, next: NextFunction) => {
 const page = parseInt(req?.query?.page as string) || 1
    const limit = parseInt(req?.query?.limit as string) || 10
const skip = (page-1) * limit
const data = await modal.find().skip(skip).limit(limit)
 const total = await modal.countDocuments()

   res.locals.dataWithPagination = {
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
    }
    next()

}}

