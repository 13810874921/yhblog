import axios from "axios"

export const getUrl = async(url) =>{
    const promise = new Promise((resolve,reject)=>{
        axios.get(url).then(res=>{
            // console.log(res.data)
            resolve(res.data)
        })
    })
    return promise
}
export const postUrl = async(url,params) =>{
    const promise = new Promise((resolve,reject)=>{
        axios.post(url,params).then(res=>{
            // console.log(res.data)
            resolve(res.data)
        })
    })
    return promise
}