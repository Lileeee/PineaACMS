// mock拦截器接收参数类型
export interface MockParams {
    url: string;
    type: string;
    body: string;
}

// mock拦截器返回数据类型
export interface MockResult {
    code: number;
    msg: string;
    data: any;
}

// user类型
export interface User {
    sudo?: string; // 管理员标识
    username: string;
    password: string;
}
