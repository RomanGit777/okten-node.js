import { FilterQuery } from "mongoose";

import {
    IUser,
    IUserCreateDTO,
    IUserQuery,
} from "../interfaces/user.interface.js";
import { User } from "../models/user.model.js";

class UserRepository {
    public getAll(query: IUserQuery): Promise<any> {
        // const skip = query.pageSize * (query.page - 1);
        //filter to select only not deleted users
        const filterObject: FilterQuery<IUser> = { isDeleted: false };

        //if the user typed something in search box, find at least one condition, that searches for partial matches,
        // case-insensitive
        if (query.search) {
            filterObject.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { surname: { $regex: query.search, $options: "i" } },
            ];
        }
        //if no order is requested mongoDB will ignore $sort
        const orderObject = {};
        if (query.order) {
            if (query.order.startsWith("-")) {
                orderObject[query.order.slice(1)] = -1; //means slice "-" from search. if search is "-age", it becomes
                // "age", so sort will know by what field sort data
            } else {
                orderObject[query.order] = 1;
            }
        }
        // User.find(filterObject).limit(query.pageSize).skip(skip);
        return User.aggregate([
            {
                $match: filterObject, //match only not deleted users
            },
            {
                $sort: orderObject, //sort by asc,desc, if it is
            },
            {
                $group: {
                    _id: null, //groups all documents into one group
                    totalItems: { $sum: 1 }, //it counts each document
                    data: { $push: "$$ROOT" }, //it pushes each document to data array
                },
            },
            {
                $project: { _id: 0 },
            },
        ]);
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }

    public updateById(userId: string, user: Partial<IUser>): Promise<IUser> {
        return User.findByIdAndUpdate(userId, user, { new: true });
    }

    public deleteById(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId);
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }

    public blockUser(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true },
        );
    }

    public unBlockUser(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: true },
            { new: true },
        );
    }
}

export const userRepository = new UserRepository();
