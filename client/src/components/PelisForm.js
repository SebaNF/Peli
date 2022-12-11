import React from 'react';
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const PelisForm = (props) => {

    const {title, director, date, onSubmitProp} = props;
    const navigate = useNavigate();

    return (
        <div>
            <Formik
                initialValues={{
                    title: title,
                    director: director,
                    date:moment(date).utc().format("yyyy-MM-DD")
                }}
                validationSchema={
                    Yup.object().shape({
                        title: Yup
                            .string()
                            .min(3, "El título es muy corto")
                            .required("Debe ingresar un nombre"),
                        director: Yup
                            .string()
                            .min(3, "El nombre es muy corto")
                            .required("Debe ingresar un director"),
                        date: Yup
                            .date()
                            .required("Debe ingresar un año")
                    })
                }
                onSubmit={(values,{setSubmitting})=>{
                    onSubmitProp(values);
                }}
                
            >   
            {({errors, touched, handleSubmit})=>{
                return(
                    <div className=''>
                        <Form>
                            <div className='form-group'>
                                <label htmlFor='title'>Titulo</label>
                                <Field type="text" name="title" className="form-control" ></Field>
                                {errors.title && touched.title && <p className='error-validation'> {errors.title} </p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='director'>Director</label>
                                <Field type="text" name="director" className="form-control" ></Field>
                                {errors.director && touched.director && <p className='error-validation'> {errors.director} </p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='date'>Fecha estreno</label>
                                <Field type="date" name="date" className="form-control"></Field>
                                {errors.date && touched.date && <p className='error-validation'> {errors.date} </p>}
                            </div>
                            <button disabled={Object.values(errors).length>0 || Object.values(touched).length===0} className='' type='submit'>Enviar</button>
                            <button onClick={()=>navigate('/')}>Volver</button>
                        </Form>
                        
                    </div>
                )
            }}
            </Formik>
        </div>
    );
}

export default PelisForm;
