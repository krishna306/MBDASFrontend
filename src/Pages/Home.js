import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col,Form,Button } from 'react-bootstrap';
import "./Home.css"
export default function Home() {
    function createCaptcha() {
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let a = letters[Math.floor(Math.random() * letters.length)];
        let b = letters[Math.floor(Math.random() * letters.length)];
        let c = letters[Math.floor(Math.random() * letters.length)];
        let d = letters[Math.floor(Math.random() * letters.length)];
        let code = a + b + c + d;
        return code
    }
    const captcha = createCaptcha()


    let navigate = useNavigate();
    return (
        <>
            <div className="fontsetting">
                <button type="button" className="btn btn-primary" id="inc">A+</button>
                <button type="button" className="btn btn-primary" id="dec">A-</button>


                <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>Log Out</button>

                <span className="lang">
                    <div id='google_translate_element' className="btn "></div>

                </span>
                <br />
                <br />
            </div>
            <div className="container Formcontainer" style={{ marginBottom: "70px" }}>
                <div className="note" id="print">
                    <h3>Note: Fields marked with asterisks (<b style={{ color: "rgb(255, 8, 8)" }}> * </b>) are mandatory</h3>
                    <span className="material-icons" aria-hidden="true"
                        style={{ cursor: "pointer", float: "right", marginTop: "20px", marginRight: "10px", marginBottom: "0", marginLeft: "0", color: "yellowgreen" }}>&#xe8ad;</span>
                </div>

                <form action="" className="form1">
                    <div className="formheading">
                        <h4>Death Certificate Application Form</h4>
                    </div>
                    {/* form part 1 starts */}
                    <div className="descrip">
                        <b><u>Applicant's Details</u></b>
                    </div>
                    <div className="conatinerFluid part2">
                        <div>
                            <span>Applicant's Name<sup style={{ color: "rgb(255, 8, 8)" }}>*</sup> </span>
                            <input type="text" name="" className="demo" placeholder="(Applicant's Name)" required />
                        </div>

                        <div>
                            <span>Applicant Gender<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup> </span>
                            <select className=" btn btn-secondary btn-sm dropdown-toggle select gender" name="gender">
                                <option value="null">Choose Gender</option>
                                <option value="male"> Male</option>
                                <option value="female"> Female</option>
                                <option value="other"> Other</option>
                            </select>
                        </div>

                        <div>
                            <span>Mobile Number<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup> </span>
                            <input type="tel" name="" className="demo" placeholder="(Mobile Number)" required />
                        </div>

                        <div>
                            <span>PAN Number</span>
                            <input type="text" name="" className="demo" placeholder="(PAN Number)" maxLength="10" required />
                        </div>

                        <div>
                            <span>Aadhar card Number</span>
                            <input type="text" name="" className="demo" placeholder="(Aadhar card Number)" maxLength="19" required />
                        </div>

                        <div>
                            <span>Email Id</span>
                            <input type="text" name="" className="demo" placeholder="(Emai)" required />
                        </div>

                    </div>

                    <div className="descrip">
                        <b><u>Address Details of Applicant</u></b>
                    </div>
                    <div className="conatinerFluid part1">
                        <div>
                            <span>State<sup style={{ color: "rgb(255, 8, 8)" }}>* </sup></span>

                            <select className=" btn btn-secondary btn-sm dropdown-toggle state" name="slct7" id="slct7">
                                <option value="assam"> ASSAM</option>

                            </select>
                        </div>
                        <div>
                            <span>District<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <select className="btn btn-secondary btn-sm dropdown-toggle district" name="slct8" id="slct8">
                                <option value="null">Choose District</option>
                                <option value="baksa">Baksa</option>
                                <option value="barpeta">Barpeta</option>
                                <option value="biswanath">Biswanath</option>
                                <option value="bongaigaon">Bongaigaon</option>
                                <option value="cachar">Cachar</option>
                                <option value="charaideo">Charaideo</option>
                                <option value="chirang">Chirang</option>
                                <option value="daranng">Daranng</option>
                                <option value="dhemaji">Dhemaji</option>
                                <option value="dhubri">Dhubri</option>
                                <option value="dibrugarh">Dibrugarh</option>
                                <option value="dima hasao">Dima Hasao</option>
                                <option value="goalpara">Goalpara</option>
                                <option value="hailankandi">Hailankandi</option>
                                <option value="hojai">Hojai</option>
                                <option value="jorhat">Jorhat</option>
                                <option value="kamrup metropolitan">Kamrup Metropolitan</option>
                                <option value="kamrup rural">Kamrup Rural</option>
                                <option value="karbi anglong">Karbi Anglong</option>
                                <option value="karimganj">Karimganj</option>
                                <option value="kokrajhar">Kokrajhar</option>
                                <option value="lakhimpur">Lakhimpur</option>
                                <option value="majuli">Majuli</option>
                                <option value="morigaon">Morigaon</option>
                                <option value="nagaon">Nagaon</option>
                                <option value="nalbari">Nalbari</option>
                                <option value="sivasagar">Sivasagar</option>
                                <option value="sonitpur">Sonitpur</option>
                                <option value="south salmara mankachar">South Salmara Mankachar</option>
                                <option value="tinsukia">Tinsukia</option>
                                <option value="udalguri">Udalguri</option>
                                <option value="west karbi anglong">West Karbi Anglong</option>
                            </select>
                        </div>
                        <div>
                            <span>Sub-Division<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup> </span>
                            <input type="text" name="" id="subdivision" className="demo" placeholder="(Sub-division)" required />
                        </div>
                        <div>
                            <span>Circle Office<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup> </span>
                            <input type="text" name="" id="circleofficer" className="demo" placeholder="(Circle Office)" required />
                        </div>


                    </div>
                    {/* form part 1 ends  */}

                    {/* form part 2 starts */}
                    <div className="descrip"><b><u>Deceased Details</u></b></div>
                    <div className="conatinerFluid part2">
                        <div> Below are the details of the deceased to be filled.</div>
                        <div>
                            <span>Date of Death: <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <label htmlFor="dateofdeath"></label>
                            <input type="date" name="" className="demo" id="dateofdeath" required />

                        </div>
                        <div>
                            <span>Name of Deceased: <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>

                            <input type="text" name="" id="name" className="demo" style={{ width: "300px" }} placeholder="(In English)" required />

                        </div>
                        <div>
                            <span>Sex of Deceased:<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <select className=" btn btn-secondary btn-sm dropdown-toggle select gender" name="gender" id="gender">
                                <option value="null">Choose Gender</option>
                                <option value="male"> Male</option>
                                <option value="female"> Female</option>
                                <option value="other"> Other</option>
                            </select>

                        </div>
                        <div>
                            <span>Name of Father:</span>

                            <input type="text" name="" id="fathername" className="demo" placeholder="(In English)" style={{ width: "300px" }} required />

                        </div>

                        <div>
                            <span>Name of Mother:</span>

                            <input type="text" name="" id="mothername" className="demo" style={{ width: "300px" }} placeholder="(In English)" required />
                        </div>

                        <div>
                            <span>Name of Husband/wife:</span>

                            <input type="text" name="" id="spousename" className="demo" style={{ width: "300px" }} placeholder="(In English)" required />
                        </div>

                        <div>
                            <span>Age of Deceased [on January 1 of the current calender]:<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>

                            <input type="number" name="" id="age" className="demo" style={{ width: "100px" }} placeholder="0" required />
                        </div>

                        <div>
                            <span>Place of Death <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup> </span>
                            <select className="btn btn-secondary btn-sm dropdown-toggle select relationship" name="Select" id="">
                                <option value="null">Select</option>
                                <option value="Hospital">Hospital</option>
                                <option value="Institution">Institution</option>
                                <option value="Home">House</option>
                                <option value="other">Other Place</option>
                            </select>
                        </div>
                        <div>
                            <span>Place Details (Name or Address):<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <input type="text" name="" id="placeofdeath address" className="demo" style={{ width: "300px" }}
                                placeholder="(In English)" required />
                        </div>

                        <div>
                            <span>Informants Name:</span>
                            <input type="text" name="" id="informant" className="demo" style={{ width: "300px" }} placeholder="(In English)" required />
                        </div>
                        <div>
                            <span>Deceased Town/Village Name:<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <input type="text" name="" id="townVillage" className="demo" style={{ width: "300px" }} placeholder="(In English)" required />
                        </div>

                        <div>
                            <span>Is it Town/Village<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <select className="btn btn-secondary btn-sm dropdown-toggle select relationship" name="townVillage" id="">
                                <option value="null">Select</option>
                                <option value="Town">Town</option>
                                <option value="Village">Village</option>
                            </select>
                        </div>

                        <div className="conatinerFluid part6">
                            <div>
                                <span>Deceased State: </span>

                                <select className=" btn btn-secondary btn-sm dropdown-toggle state" name="slct1" id="slct1">
                                    <option value="assam"> ASSAM</option>
                                </select>
                            </div>

                            <div>
                                <span>Deceased District<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                                <select className="btn btn-secondary btn-sm dropdown-toggle district" name="slct2" id="slct2">
                                    <option>Choose District</option>
                                    <option value="baksa">Baksa</option>
                                    <option value="barpeta">Barpeta</option>
                                    <option value="biswanath">Biswanath</option>
                                    <option value="bongaigaon">Bongaigaon</option>
                                    <option value="cachar">Cachar</option>
                                    <option value="charaideo">Charaideo</option>
                                    <option value="chirang">Chirang</option>
                                    <option value="daranng">Daranng</option>
                                    <option value="dhemaji">Dhemaji</option>
                                    <option value="dhubri">Dhubri</option>
                                    <option value="dibrugarh">Dibrugarh</option>
                                    <option value="dima hasao">Dima Hasao</option>
                                    <option value="goalpara">Goalpara</option>
                                    <option value="hailankandi">Hailankandi</option>
                                    <option value="hojai">Hojai</option>
                                    <option value="jorhat">Jorhat</option>
                                    <option value="kamrup metropolitan">Kamrup Metropolitan</option>
                                    <option value="kamrup rural">Kamrup Rural</option>
                                    <option value="karbi anglong">Karbi Anglong</option>
                                    <option value="karimganj">Karimganj</option>
                                    <option value="kokrajhar">Kokrajhar</option>
                                    <option value="lakhimpur">Lakhimpur</option>
                                    <option value="majuli">Majuli</option>
                                    <option value="morigaon">Morigaon</option>
                                    <option value="nagaon">Nagaon</option>
                                    <option value="nalbari">Nalbari</option>
                                    <option value="sivasagar">Sivasagar</option>
                                    <option value="sonitpur">Sonitpur</option>
                                    <option value="south salmara mankachar">South Salmara Mankachar</option>
                                    <option value="tinsukia">Tinsukia</option>
                                    <option value="udalguri">Udalguri</option>
                                    <option value="west karbi anglong">West Karbi Anglong</option>

                                </select>
                            </div>
                        </div>


                        <div>
                            <span>Deceased Address at time of Death:<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <br />
                            <label htmlFor="addressatdeath"></label>
                            <textarea name="addressatdeath" id="addressatdeath" cols="50" rows="5"></textarea>
                        </div>

                        <div>
                            <span>Deceased Permanent Address:<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <br />
                            <label htmlFor="permanentaddress"></label>
                            <textarea name="permanentaddress" id="permanentaddress" cols="50" rows="5"></textarea>
                        </div>

                        <div>
                            <span>Deceased Religion:</span>
                            <select className="btn btn-secondary btn-sm dropdown-toggle select relationship" name="religion" id="">
                                <option value="null">Select</option>
                                <option value="Hindu">Hindu</option>
                                <option value="Muslim">Muslim</option>
                                <option value="Christian">Christian</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <span>Other Religion Details:<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>

                            <input type="text" name="" id="otherReligion" className="demo" style={{ width: "300px" }} placeholder="(In English)" required />
                        </div>

                        <div>
                            <span>Deceased Occupation:<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>

                            <input type="text" name="" id="occupation" className="demo" style={{ width: "300px" }} placeholder="(In English)" required />
                        </div>

                        <div>
                            <span>Type of Medical Attention receivedbefore death<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <select className="btn btn-secondary btn-sm dropdown-toggle select relationship" name="" id="">
                                <option value="null">Select</option>
                                <option value="Institutional">Institutional</option>
                                <option value="Medical Other than Institution">Medical Other than Institution</option>
                                <option value="none">No Medical Attention</option>
                            </select>
                        </div>

                        <div>
                            <span>Death Cause Medically Certified:<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <br />

                            <input type="radio" id="yes" name="med_cer" value="Yes" />
                            <label htmlFor="yes">YES</label><br />
                            <input type="radio" id="no" name="med_cer" value="No" checked />
                            <label htmlFor="no">NO</label>
                        </div>

                        <div>
                            <span>Name of Disease/Actual cause of Death:<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>

                            <input type="text" name="" id="deathcause" className="demo" style={{ width: "300px" }} placeholder="(In English)" required />
                        </div>

                        <div>
                            <span>If Habitual Smoker then for how many years:</span>

                            <input type="number" name="" id="ifsmoke" className="demo" style={{ width: "100px" }} required />
                        </div>

                        <div>
                            <span>If Habitual Tobacco Chewer in any form for how many years:</span>

                            <input type="number" name="" id="iftobchew" className="demo" style={{ width: "100px" }} required />
                        </div>

                        <div>
                            <span>If Habitual Arecanut(including Panmasala) user for how many years:</span>

                            <input type="number" name="" id="ifnuts" className="demo" style={{ width: "100px" }} required />
                        </div>

                        <div>
                            <span>If Habitual Drinker for how many years:</span>

                            <input type="number" name="" id="ifdrinkss" className="demo" style={{ width: "100px" }} required />
                        </div>

                        <div>
                            <span>If Female death, did death occur while Pregnant at time of delivery or 6 weeks after end of Pregnancy</span>
                            <br />

                            <input type="radio" id="yes" name="pregnant" value="Yes" />
                            <label htmlFor="yes">YES</label><br />
                            <input type="radio" id="no" name="pregnant" value="No" checked />
                            <label htmlFor="no">NO</label>
                        </div>

                        <div className="breaksection">
                            <span>Signature of the Applicant<sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                            <input type="file" name="" className="docs" />
                            <button className="btn btn-primary mx-2" value="uploadsig" >Upload</button >
                        </div>

                    </div>

                    {/* form part 5 starts */}

                    <div className="descrip">
                        Upload supporting documents (Supported formats .pdf) (max. 2MB)<span>
                            <button style={{ display: "contents" }}>
                                <u id="myBtn">
                                    <br />
                                    <span style={{ fontSize: "0.8rem" }}>
                                        List of supported documents
                                    </span>
                                </u>
                            </button>
                            <div id="myModal" className="modal" style={{ width: "90vw", fontFamily: ['Open Sans', 'sans-serif'] }}>
                                <div className="modal-content">
                                    <span className="close">&times;</span>
                                    <h4 className="head1">List of Acceptable Supporting Documents</h4>

                                    <ol className="ol">
                                        <li>Certificate of Death issued from Private Hospital/Nursing home</li>
                                        <li>Goanburah Certificate</li>
                                        <li>Any Other Documents</li>
                                        <ul className="ul">
                                            <li>10th Standard Certificate</li>
                                            <li>Birth Certificate</li>
                                            <li>Pan Card</li>
                                            <li>Aadhaar Card</li>
                                            <li>Driving Licence</li>
                                            <li>Copy of Passport</li>
                                            <li>Kisan Card</li>
                                        </ul>
                                    </ol>

                                </div>
                            </div>
                            &nbsp;
                        </span>
                    </div>


                    <div className="conatinerFluid part5">
                        <div className="eachimage">
                            <div className="breaksection">
                                <p>Certificate of Death issued from Private Hospital/Nursing home</p>
                                <input type="file" name="" className="docs" />
                                <button className="btn btn-primary mx-2" value="uploaddc" >Upload</button >
                            </div>


                        </div>
                        <div className="eachimage">
                            <div className="breaksection">
                                <span>Goanburah Certificate</span>
                                <br />
                                <input type="file" name="" className="docs" />
                                <button className="btn btn-primary mx-2" value="uploadgc" >Upload</button >
                            </div>

                        </div>
                        <div className="eachimage">
                            <div className="breaksection">
                                <span>Other Documents</span>
                                <br />
                                <input type="file" name="" className="docs" />
                                <button className="btn btn-primary mx-2" value="uploadod" >Upload</button >
                            </div>

                        </div>
                    </div>

                    {/* <!-- form part 5 ends --> */}

                    {/* <!-- form part 6 starts --> */}

                    <div className="conatinerFluid part6">

                        <div style={{ borderBottom: "3px solid white" }}></div>
                        <div>
                            <div>
                                <span>Location <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                                <input className="date" type="text" name="" id="" required />
                            </div>
                            <div>
                                <span>Date <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup></span>
                                <input className="date" type="date" name="" id="" />
                            </div>
                        </div>
                    </div>



                    <Row style={{width:"50%"}}>
                        <Col md={2}
                            style={{
                                backgroundColor: "grey",
                                border: "1px solid black",
                                borderRadius: "5px",
                                width: "80px",
                                height: "35px",
                                marginLeft: "10px",
                                marginBottom: "5px"
                            }}
                        >
                            <span style={{ fontSize: "25px" }}>{captcha}</span>
                        </Col>
                        <Col md={5}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Captcha"
                                    name="Captcha"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Button>
                                Verify
                            </Button>
                        </Col>
                    </Row>




                    <div className="myBtn">
                        <button type="reset" className="btn btn-danger mx-2" value="Reset" >Reset</button >
                        <button type="reset" className="btn btn-primary mx-2 " value="Reset" >Submit</button >
                    </div>


                </form>
            </div >
            <button id="scrollToTopButton" title="Go to top" className="ml-5">
                <i className="fa fa-angle-double-up" aria-hidden="true" style={{ color: "black", fontWeight: "bolder" }}></i>
            </button>
        </>
    )
}
