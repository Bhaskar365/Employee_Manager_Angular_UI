
export interface Employee 
{
    userID:number;
    Name:string;
    Email:string;
    Gender:string;
    Address:string;
    Phone:string;
    JoiningDate:Date;
    CreatedOn:Date;
}

export interface CreateEmp{
    Name:string;
    Email:string;
    Gender:string;
    Address:string;
    Phone:string;
    JoiningDate:string;
    CreatedOn:string;
}
