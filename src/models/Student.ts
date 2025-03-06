export class Student {
    constructor(
        public _id: string = "",
        public FirstName: string = "",
        public LastName: string = "",
        public School: string = "",
        public StartDate: string = new Date().toISOString().split('T')[0],

        // __v is a version key used by Mongoose to track document updates.
        // Every time the document is updated, Mongoose increments this number.
        public __v: number = 0
    ){}
}