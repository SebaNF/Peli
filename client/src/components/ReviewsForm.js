import React from 'react';
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const ReviewsForm = (props) => {

    const {creatorName, review, rating, onSubmitProp} = props;




    return (
        <div>
            <Formik
                initialValues={{
                    creatorName: creatorName,
                    review: review,
                    rating: rating
                }}
                validationSchema={
                    Yup.object().shape({
                        creatorName: Yup
                            .string()
                            .min(2, "El nombre es muy corto")
                            .required("Debe ingresar un nombre"),
                        review: Yup
                            .string()
                            .min(3, "La reseña es muy corta")
                            .required("Debe ingresar una reseña"), 
                        rating: Yup
                            .number()
                            .required("Debe ingresar una calificación")
                            .min(1,"rating debe ser al menos 1")
                            .max(5,"rating máximo 5")
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
                                <label htmlFor='creatorName'>Ingrese su nombre</label>
                                <Field type="text" name="creatorName" className="form-control" ></Field>
                                {errors.creatorName && touched.creatorName && <p className='error-validation'> {errors.creatorName} </p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='review'>Escriba su reseña</label>
                                <Field type="text" name="review" as="textarea" className="form-control" ></Field>
                                {errors.review && touched.review && <p className='error-validation'> {errors.review} </p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor='rating'>Calificación</label>
                                <Field type="number" as="select" name="rating" className="form-control" >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Field>
                                {errors.rating && touched.rating && <p className='error-validation'> {errors.rating} </p>}
                            </div>
                            <button disabled={Object.values(errors).length>0 || Object.values(touched).length===0} className='' type='submit'>Enviar</button>
                        </Form>
                        
                    </div>
                )
            }}
            </Formik>
        </div>
    );
}

export default ReviewsForm;
