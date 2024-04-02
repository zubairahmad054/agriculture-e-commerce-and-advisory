export default function valida(values){
    let error={};
    let letters=/^[A-Za-z]+$/;
    let letters1 = /^([A-zÀ-ž\s])+$/;
    if(!values.desc)
    {
    error.desc="Name Required";

    }
}