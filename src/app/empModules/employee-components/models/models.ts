export interface Department {
    DepartmentId:number;
    DepartmentName:string | null|undefined ;
}

export interface Employee 
{
    FirstName:string;
    LastName:string;
    Email:string;
    Gender:string;
    Country:string;
    City:string;
    State:string;
    ZipCode:string;
    Phone:string;
    DepartmentId:string;
    _Department:Department;
    Position:string;
    DateOfHire:string;
    CTC:string;
    userImage:string;
}

export interface CreateEmp{
    FirstName:string;
    LastName:string;
    Email:string;
    Gender:string;
    Address:string;
    City:string;
    State:string;
    ZipCode:string;
    Phone:string;
    DepartmentId:string;
    Position:string;
    DateOfHire:string;
    CTC:string;
    userImage:string;
}



export interface UpdateEmp {
    UserID:string;
    FirstName:string;
    LastName:string;
    Email:string;
    Gender:string;
    Address:string;
    City:string;
    State:string;
    ZipCode:string;
    Phone:string;
    DepartmentId:string;
    Position:string;
    DateOfHire:string;
    CTC:string;
    userImage:string;
}