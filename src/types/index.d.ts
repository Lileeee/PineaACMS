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
    id: number;
    username: string;
    password: string;
}

// article类型
export interface Article {
    id: number;
    authorId: number;
    content: string;
    status: number; // 文章状态 0未审核 1通过 2打回
    hot: boolean;
    visible: boolean;
    comments: number;
    likes: number;
    marks: number;
}

export interface User_Arti {
    id: number;
    authorId: number;
    articleIds: number[];
}
