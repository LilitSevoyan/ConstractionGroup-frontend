import React from "react"
import { Phone, Mail, Address, Facebook, Instagram, Linkedin } from "../../../assets/index"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"

export default function ContactWrapper() {
    const API_URL = process.env.REACT_APP_API_URL
    const language = localStorage.getItem("language")
    
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            message:''
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required(),
            email: Yup.string().email().required(),
            phoneNumber: Yup.number().min(9).required(),
            message:Yup.string().required(),
        }),
        onSubmit: (values, {resetForm}) => {
            axios.post(`${API_URL}/contact`, {
                fullName: formik.values.fullName,
                email: formik.values.email,
                phoneNumber: formik.values.phoneNumber,
                message: formik.values.message
            }, 
            {
                headers: {
                    "Accept-Language": language
                }
            })
            .then(res => resetForm())
            .catch(errors => console.log(errors))
        },
    })
    return (
        <div className="ContactMainContent">
            <div className="LeftSide">
                <h1 className="subtitle">Կոնտակտային տվյալներ</h1>
                <div className="description">Կարող եք կապ հաստատել մեզ հետ նշված եղանակներով</div>
                <div className="line"></div>
                <div className="contact-items">
                    <Link to="tel:+37477444444" className="item-card">
                        <div className="icon-wrapper">
                            <Phone/>
                        </div>
                        <div className="item-card-content">
                            <div className="item-card-content-title">Հեռ․</div>
                            <div className="item-card-content-text">+37477444444</div>
                        </div>
                    </Link>
                    <Link to="mailto:sales@construction-group.am." className="item-card">
                        <div className="icon-wrapper">
                            <Mail/>
                        </div>
                        <div className="item-card-content">
                            <div className="item-card-content-title">Էլ․ հասցե</div>
                            <div className="item-card-content-text">sales@construction-group.am</div>
                        </div>
                    </Link>
                </div>
                <div className="line"></div>
                <Link to="/address" className="item-card">
                    <div className="icon-wrapper">
                        <Address/>
                    </div>
                    <div className="item-card-content">
                        <div className="item-card-content-title">Հասցե</div>
                        <div className="item-card-content-text">Երևան,Գյուրջյան 27 փ․</div>
                    </div>
                </Link>
                <div className="line"></div>
                <div className="social-wrapper">
                    <Facebook/>
                    <Instagram/>
                    <Linkedin/>
                </div>
            </div>
            <div className="RightSide">
                <h1 className="subtitle">Ուղարկել հաղորդագրություն</h1>
                <div className="description">
                    Ուղարկեք Ձեր հաղորդագրությունը, մեր մասնագետները կպատասխանեն Ձեզ հնարավորինս շուտ
                </div>
                <form className="fields-wrapper" >
                    <div className="fields-horizontal">
                        <div className="custom-input-group" id = "name">
                            <input type="text" name="fullName" placeholder="Անուն Ազգանուն" autoComplete="off"
                                className={`${formik.touched.fullName && formik.errors.fullName ? "border-red" : ""}`}
                                onBlur={formik.handleBlur}
                                value={formik.values.fullName} 
                                onChange ={formik.handleChange} 
                            />
                        </div>
                        <div className="custom-input-group" id = "email">
                            <input type="text" name="email" placeholder="Էլ․ հասցե" autoComplete="off"
                                className={`${formik.touched.email && formik.errors.email ? "border-red" : ""}`}
                                value ={formik.values.email}
                                onChange ={formik.handleChange}
                                onBlur={formik.handleBlur}  
                            />
                        </div>
                    </div>
                    <div className="custom-input-group" id="phone">
                        <input type="text" name="phoneNumber" placeholder="Հեռ. համար" autoComplete="off"
                            className={`${formik.touched.phoneNumber && formik.errors.phoneNumber ? "border-red" : ""}`}
                            value={formik.values.phoneNumber} 
                            onChange ={formik.handleChange}
                            onBlur={formik.handleBlur} 
                        />
                    </div>
                    <div className="custom-input-group" id="message">
                        <textarea name="message" placeholder="Ձեր հաղորդագրոթյունը" maxLength="30" 
                            className={`${formik.touched.message && formik.errors.message ? "border-red" : ""}`}
                            value={formik.values.message} 
                            onChange ={formik.handleChange}
                            onBlur={formik.handleBlur} 
                        ></textarea>
                    </div>
                    <button className="PrimaryButton" type="submit" onClick={formik.handleSubmit} >Ուղարկել</button>
                </form>
            </div>
        </div>
    )
}