import { Company, Job } from "./db.js"


export const resolvers = {
    Query:  {
        job  : (_root,{id}) =>  Job.findById(id),
        jobs : () => Job.findAll(),
        companyById: (_root,{id}) => {
            return Company.findById(id)
        } 
    },

    Mutation:{
        createJob: (_root,{input},{user}) => {
            console.log("Context",user);
            if(!user){
                throw new Error(" !")
            }
            
           return Job.create({...input, companyId : user.companyId})
        
        },
        deleteJob: (_root,{id},{user}) => {
            if(!user){
                throw new Error(" !")
            }
            
            return Job.delete(id)
        
        },
        updateJob: (_root,{input})  => Job.update(input)
    },

    Job:{
        company: (job) => {
            return Company.findById(job.companyId)
        }
    },

    Company:{
        jobs : (company) => {
            return Job.findAll( (job) => job.companyId === company.id )
        }
    }

}