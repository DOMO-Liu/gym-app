import { ILayout } from '/@/type/store/layout'
import { IVehicle } from '/@/type/store/vehicle'

// 额外的属性检查
// export interface ILocalStore {
//     [propName: string]: any
// }

declare global {
    // 函数类型
    interface Fn<T = any, R = T> {
        (...arg: T[]): R;
    }
    interface PromiseFn<T = any, R = T> {
        (...arg: T[]): Promise<R>;
    }
    // 可索引的类型
    interface StringArray {
        [index: number]: string;
    }
    interface SelectOption {
        label: string | number;
        value: string | number;
        [propName: string]: any
    }
    type SelectOptionMap = Recordable<SelectOption[] | Recordable<SelectOption[]>>
    interface IResponse<T = any> {
        code: number;
        msg: string;
        data: T;
    }
    type Recordable<T = any> = Record<string, T>;
    interface IObject<T> {
        [index: string]: T
    }
    interface IState {
        layout: ILayout,
        vehicle: IVehicle
    }
    interface ITable<T = any> {
        data?: Array<T>
        total: number
        current: number
        size: number
        content?: string
    }
    interface IReq {
        body: any
    }
    interface IToken {
        access_token: string
        refresh_token: string
    }
    interface IUserInfo {
        is_admin?: string | number
        tenant_id: string | number
        user_id: number
        username: string
        role_code: Recordable[],
        mobile: string
        gender: string
        email: string
        avatar?: string
    }
    interface Tree {
        label: string
        children?: Tree[]
    }
}
