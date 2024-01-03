export interface Department {
    DepartmentId:number;
    DepartmentName:string | null|undefined ;
}

export interface CreateEmp{
    FirstName:string;
    LastName:string;
    Email:string;
    Gender:string;
    City:string;
    State:string;
    Country:string;
    ZipCode:string;
    Phone:string;
    DepartmentId:string;
    Position:string;
    DateOfHire:string;
    CTC:string;
    _Department:Department;
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