
interface User {
    id: string,
    name: string,
    pwd: string,
}

const list:number[] = [1,2,3]
const list2: Array<number> = [1,2,3,4];


class Base {
    id: string;
}
class User extends Base {
    id: string;
    name: string;
    pwd: string;
    constructor(user: User) {
        super();
        this.name = user.name;
        this.pwd = user.pwd;
    }
}
export default User