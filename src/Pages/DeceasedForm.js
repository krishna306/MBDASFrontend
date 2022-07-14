import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import ReCAPTCHA from "react-google-recaptcha";
import "./Form.css";
import { useSelector } from "react-redux";
import {
  useCreateApplicantMutation,
  useCreateDeceasedMutation,
} from "../services/appApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function DeceasedForm() {
  const [captchaValue, setCaptchaValue] = useState(null);
  // user from browser Storage
  const { user } = useSelector((state) => state.user);

  // Creating new applicant and deceased
  const [createApplicant, { isLoading }] = useCreateApplicantMutation();
  const [createDeceased] = useCreateDeceasedMutation();

  // District of a perticular State
  const [district, setDistrict] = useState([]);
  const [deceasedDistrict, setDeceasedDistrict] = useState([]);

  // applicant details
  const [isSubmit, setIsSubmit] = useState(false);
  //Files Uploading
  const [fileSelected, setFileSelected] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [field, setField] = useState("");

  //form submitting
  const [submittingFromData, setSubmittingFromData] = useState(false);

  // Printing form after filling up data
  const ComponentRef = useRef();
  const navigate = useNavigate();
  const handlePrint = useReactToPrint({
    content: () => ComponentRef.current,
  });

  // form errors
  const [deceasedFormErrors, setDeceasedFormErrors] = useState({});
  const [applicantFormErrors, setApplicantFormErrors] = useState({});

  // Applicant's Details
  const [applicantField, setApplicantField] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    state: "",
    district: "",
    gender: "",
    pan: "",
    aadhar: "",
    subdivision: "",
    circleoffice: "",
    sig: "",
  });

  // Deceased Details
  const [deceasedField, setDeceasedField] = useState({
    date: "",
    aadhar: "",
    deadname: "",
    gender: "",
    father: "",
    mother: "",
    spouse: "",
    age: "",
    placeOfDeath: "",
    placedetails: "",
    informantName: "",
    informantRelation: "",
    deceasedstate: "",
    district: "",
    torvName: "",
    townOrVillage: "",
    addressAtDead: "",
    addressPermanent: "",
    religion: "",
    occupation: "",
    typeOfMedicalAttention: "",
    medicallyCertified: "",
    disease: "",
    smoker: "",
    tobacco: "",
    panmasala: "",
    drinker: "",
    pregnancydeath: "",
    signature: "",
    signatureDate: "",
  });

  // Files
  const [Files, setFiles] = useState({
    signature: "",
    deathCertificate: "",
    goanburahCertificate: "",
    otherDocuments: "",
    applicantAadhar:"",
    applicantPanCard:"",
    deceasedAadhar:""
    
  });

  useEffect(() => {
    if (Object.keys(applicantFormErrors).length === 0 && isSubmit) {
      console.log(applicantField);
    }
  }, [applicantField, applicantFormErrors, isSubmit]); // caution

  //User Login Verification
  if (!user) {
    return (
      <div className="text-center m-4">
        <h3>Please Login first...</h3>
      </div>
    );
  }

  //Upload files to cloudinary

  async function uploadFile(e) {
    e.preventDefault();
    if (!fileSelected) {
      return;
    }
    const data = new FormData();
    data.append("file", fileSelected);
    data.append("upload_preset", "fzvmeqjw");
    setUploadingFile(true);
    fetch("https://api.cloudinary.com/v1_1/dxu9wmzkp/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        Files[field] = res.url;
        setUploadingFile(false);
      })
      .catch((error) => {
        setUploadingFile(false);
        console.log(error);
      });
  }

  function handleFileValidation(e) {
    const file = e.target.files[0];
    // const regexFileExtension = /^.*\.(pdf|PDF)$/;

    if (file) {
      if (file.size > 2097152) {
        setFileSelected(null);
        return alert("Upload a file less than 2MB!");
      } else {
        setFileSelected(file);
      }
      setField(e.target.name);
    }
  }

  function populate(State, forWhat) {
    let s7 = {};

    s7.value = State;
    let optionArray;
    if (s7.value == "andaman and nicobar islands") {
      optionArray = [
        "nicobar|Nicobar",
        "north and middle andaman|North and Middle Andaman",
        "south andaman|South Andaman",
      ];
    } else if (s7.value === "andhra pradesh") {
      optionArray = [
        "anantapur|Anantapur",
        "chittoor|Chittor",
        "east godavari|East Godavari",
        "guntur|Guntur",
        "kadapa|Kadapa",
        "krishna|Krishna",
        "kurnool|Kurnool",
        "nellore|Nellore",
        "prakasam|Prakasam",
        "srikakulum|Srikakilum",
        "vishakhapatnam|Vishakhapatnam",
        "vizianagaram|Vizianagaram",
        "west godavari|West Godavari",
      ];
    } else if (s7.value === "arunachal pradesh") {
      optionArray = [
        "anjaw|Anjaw",
        "changalng|Changlang",
        "dibang valley|Dibang Valley",
        "east kameng|East Kameng",
        "east siang|East Siang",
        "itanagar capital complex|Itanagar Capital Complex",
        "kamle|Kamle",
        "kra daadi|Kra Daadi",
        "kurung kumey|Kurung Kumey",
        "lepa rada|Lepa Rada",
        "lohit|Lohit",
        "longding|Longding",
        "lower dibang valley|Lower Dibang Valley",
        "lower siang|Lower Siang",
        "lower subansiri|Lower Subansiri",
        "namsai|Namsai",
        "pakke kessang|Pakke Kessang",
        "papum pare|Papum Pare",
        "shi yomi|Shi Yomi",
        "siang|Siang",
        "tawang|Tawang",
        "tirap|Tirap",
        "upper siang|Upper Siang",
        "upper subansiri|Upper Subansiri",
        "west kameng|West kameng",
        "west siang|West Siang",
      ];
    } else if (s7.value === "assam") {
      optionArray = [
        "baksa|Baksa",
        "barpeta|Barpeta",
        "biswanath|Biswanath",
        "bongaigaon|Bongaigaon",
        "cachar|Cachar",
        "charaideo|Charaideo",
        "chirang|Chirang",
        "daranng|Daranng",
        "dhemaji|Dhemaji",
        "dhubri|Dhubri",
        "dibrugarh|Dibrugarh",
        "dima hasao|Dima Hasao",
        "goalpara|Goalpara",
        "hailankandi|Hailankandi",
        "hojai|Hojai",
        "jorhat|Jorhat",
        "kamrup metropolitan|Kamrup Metropolitan",
        "kamrup rural|Kamrup Rural",
        "karbi anglong|Karbi Anglong",
        "karimganj|Karimganj",
        "kokrajhar|Kokrajhar",
        "lakhimpur|Lakhimpur",
        "majuli|Majuli",
        "morigaon|Morigaon",
        ,
        "nagaon|Nagaon",
        "nalbari|Nalbari",
        "sivasagar|Sivasagar",
        "sonitpur|Sonitpur",
        "south salmara mankachar|South Salmara Mankachar",
        "tinsukia|Tinsukia",
        "udalguri|Udalguri",
        "west karbi anglong|West Karbi Anglong",
      ];
    } else if (s7.value === "bihar") {
      optionArray = [
        "araria|Araria",
        "arwal|Arwal",
        "aurangabad|Aurangabad",
        "banka|Banka",
        "begusarai|Begusarai",
        "bhojpur|Bhojpur",
        "buxar|Buxar",
        "darbhanga|Dharbhanga",
        "east champaran|East Champaran",
        "gaya|Gaya",
        "gopalganj|Gopalganj",
        "jamui|Jamui",
        "jehanabad|Jehanabad",
        "kaimur|Kaimur",
        "katihar|Katihar",
        "khagaria|Khagaria",
        "kishanganj|Kishanganj",
        "lakhisarai|Lakhisarai",
        "madhepura|Madhepura",
        "madhubani|Madhubani",
        "munger|Munger",
        "muzaffarpur|Muzaffapur",
        "nalanda|Nalanda",
        "nawada|Nawada",
        "patna|Patna",
        "purnia|Purnia",
        "rohtas|Rohtas",
        "saharsa|Saharsa",
        "samashtipur|Samashtipur",
        "saran|Saran",
        "sheikhpura|Sheikhpura",
        "sheohar|Sheohar",
        "sitamarhi|Sitamarhi",
        "siwan|Siwan",
        "supaul|Supaul",
        "vaishali|Vaishali",
        "west champaran|West Champaran",
      ];
    } else if (s7.value === "chandigarh") {
      optionArray = ["chandigarh|Chandigarh"];
    } else if (s7.value === "chattisgarh") {
      optionArray = [
        "balod|Balod",
        "baloda bazaar|Baloda Bazaar",
        "balrampur|Balrampur",
        "bastar|Bastar",
        "bemetara|Bemetara",
        "bijapur|Bijapur",
        "bilaspur|Bilaspur",
        "dantewada|Dantewada",
        "dhamtari|Dhamtari",
        "durg|Durg",
        "gariaband|Gariaband",
        "gaurela pendra marwahi|Gaurela Pendra Marwahi",
        "janjgir-champa|Janjgir-Champa",
        "jashpur|Jahspur",
        "kanker|Kanker",
        "kawardha|Kawardha",
        "kondagaon|Kondagaon",
        "korba|Korba",
        "koriya|Koriya",
        "mahasamund|Mahasamund",
        "mungeli|Mungeli",
        "narayanpur|Narayanpur",
        "raigarh|Raigarh",
        "raipur|Raipur",
        "rajnandgaon|Rajnandgaon",
        "sukma|Sukma",
        "surajpur|Surjapur",
        "surguja|Surguja",
      ];
    } else if (s7.value === "dadra and nagar haveli") {
      optionArray = ["dadra and nagar haveli|Dadra and Nagar Haveli"];
    } else if (s7.value === "daman and diu") {
      optionArray = ["daman|Daman", "diu|Diu"];
    } else if (s7.value === "delhi") {
      optionArray = [
        "central delhi|Central Delhi",
        "east delhi|East Delhi",
        "new delhi|New Delhi",
        "north delhi|North Delhi",
        "north east delhi|North East Delhi",
        "north west delhi|North West Delhi",
        "shahdara|Shahdara",
        "south delhi|South Delhi",
        "south east delhi|South East Delhi",
        "south west delhi|South West Delhi",
        "west delhi|West Delhi",
      ];
    } else if (s7.value === "goa") {
      optionArray = ["north goa|North Goa", "south goa|South Goa"];
    } else if (s7.value === "gujarat") {
      optionArray = [
        "ahmedabad|Ahmedabad",
        "ahmedabad corporation|Ahmedabad Corporation",
        "amreli|Amreli",
        "anand|Anand",
        "aravalli|Aravalli",
        "banaskantha|Banaskantha",
        "bharuch|Bharuch",
        "bhavnagar|Bhavnagar",
        "bhavnagar corporation|Bhavnagar Corporation",
        "botad|Botad",
        "chhotaudepur|Chhotaudepur",
        "dahod|Dahod",
        "dang|Dang",
        "devbhumi dwaraka|Devbhumi Dwaraka",
        "gandhinagar|Gandhinagar",
        "gir somnath|Gir Somnath",
        "jamnagar|Jamnagar",
        "jamnagar corporation|Jamnagar Corporation",
        "junagadh|Junagadh",
        "junagadh corporation|junagadh corporation",
        "kheda|Kheda",
        "kutch|Kutch",
        "mahisagar|Mahisagar",
        "mehsana|Mehsana",
        "morbi|Morbi",
        "narmada|Narmada",
        "navsari|Navsari",
        "panchmahal|Panchmahal",
        "patan|Patan",
        "porbandar|Porbandar",
        "rajkot|Rajkot",
        "rajkot corporation|Rajkot Corporation",
        "sabarkantha|Sabarkantha",
        "surat|Surat",
        "surat corporation|Surat Corporation",
        "surendranagar|Surendranagar",
        "tapi|Tapi",
        "vadodara|Vadodara",
        "vadodara corporation|Vadodara Corporation",
        "valsad|Valsad",
      ];
    } else if (s7.value === "haryana") {
      optionArray = [
        "ambala|Ambala",
        "bhiwani|Bhiwani",
        "charkhi dadri|Charkhi Dadri",
        "faridabad|Faridabad",
        "fatehabad|Fatehabad",
        "gurgaon|Gurgaon",
        "hisar|Hisar",
        "jhajjar|Jhajjar",
        "jind|Jind",
        "kaithal|Kaithal",
        "karnal|Karnal",
        "kurukshetra|Kurukshetra",
        "mahendragarh|Mahendragarh",
        "nuh|Nuh",
        "palwal|Palwal",
        "panchkula|Panchkula",
        "panipat|Panipat",
        "rewari|Rewari",
        "rohtak|Rohtak",
        "sirsa|Sirsa",
        "sonipat|Sonipat",
        "yamunanagar|Yamunanagar",
      ];
    } else if (s7.value === "himachal pradesh") {
      optionArray = [
        "bilaspur|Bilaspur",
        "chamba|Chamba",
        "hamirpur|Hamirpur",
        "kangra|kangra",
        "kinnaur|Kinnaur",
        "kullu|Kullu",
        "lahaul spiti|Lahaul Spiti",
        "mandi|Mandi",
        "shimla|Shimla",
        "sirmaur|Sirmaur",
        "solan|Solan",
        "una|Una",
      ];
    } else if (s7.value === "jammu and kashmir") {
      optionArray = [
        "anantnag|Anantnag",
        "bandipore|Bandipore",
        "baramulla|Baramulla",
        "budgam|Budgam",
        "doda|Doda",
        "ganderbal|Ganderbal",
        "jammu|Jammu",
        "kathua|Kathua",
        "kishtwar|Kishtwar",
        "kulgam|Kulgam",
        "kupwara|Kupwara",
        "poonch|Poonch",
        "pulwama|Pulwama",
        "rajouri|Rajouri",
        "ramban|Ramban",
        "reasi|Reasi",
        "samba|Samba",
        "shopian|Shopian",
        "srinagar|Srinagar",
        "udhampur|Udhampur",
      ];
    } else if (s7.value === "jharkhand") {
      optionArray = [
        "bokaro|Bokaro",
        "chatra|Chatra",
        "deoghar|Deoghar",
        "dhanbad|Dhanbad",
        "dumka|Dumka",
        "east singhbhum|East Singhbhum",
        "garhwa|Garhwa",
        "giridih|Giridih",
        "godda|Godda",
        "gumla|Gumla",
        "hazaribagh|Hazaribagh",
        "jamtara|Jamtara",
        "khunti|Khunti",
        "koderma|koderma",
        "latehar|Latehar",
        "pakur|Pakur",
        "palamu|Palamu",
        "ramgarh|Ramgarh",
        "ranchi|ranchi",
        "sahebganj|Sahebganj",
        "seraikela kharsawan|Seraikela Kharsawan",
        "simdega|Simdega",
        "west singhbhum|West Singhbhum",
      ];
    } else if (s7.value === "karnataka") {
      optionArray = [
        "bagalkot|Bagalkot",
        "bangalore rural|Bangalore Rural",
        "Bangalore Urban|Bangalore Urban",
        "bbmp|BBMP",
        "belgaum|Belgaum",
        "bellary|Bellary",
        "bidam|Bidam",
        "chamarajanagar|Chamarajanagar",
        "chikamagalur|Chikamagalur",
        "chikkaballapur|Chikkaballapur",
        "chitradurga|Chitradurga",
        "dakshina kannada|Dakshina Kannada",
        "devanagere|Devanagere",
        "dharwad|Dharwad",
        "gadag|Gadag",
        "gulbarga|Gulbarga",
        "hassan|Hassan",
        "haveri|Haveri",
        "kodagu|Kodagu",
        "kolar|Kolar",
        "koppal|Koppal",
        "mandya|Mandya",
        "mysore|Mysore",
        "raichur|Raichur",
        "ramanagara|Ramanagara",
        "shimoga|Shimoga",
        "tumkur|Tumkur",
        "udupi|Udupi",
        "uttar kannada|Uttar Kannada",
        "vijayapura|Vijayapura",
        "yadgir|Yadgir",
      ];
    } else if (s7.value === "kerala") {
      optionArray = [
        "alappuzha|Alappuzha",
        "ernakulam|Ernakulam",
        "idukki|Idukki",
        "kannur|Kannur",
        "kasaragod|Kasaragod",
        "kollam|Kollam",
        "kottayam|Kottayam",
        "kozhikode|Kozikode",
        "malappuram|Malappuram",
        "palakkad|Palakkad",
        "pathanamthitta|Pathanamthitta",
        "thiruvananthapuram|Thiruvananthapuram",
        "thrissur|Thrissur",
        "wayanad|Wayanad",
      ];
    } else if (s7.value === "ladakh") {
      optionArray = ["kargil|Kargil", "leh|Leh"];
    } else if (s7.value === "lakshadweep") {
      optionArray = ["agatti island|Agatti Island", "lakshadweep|Lakshadweep"];
    } else if (s7.value === "madhya pradesh") {
      optionArray = [
        "agar|Agar",
        "alirajpur|Alirajpur",
        "anuppur|Anuppur",
        "ashoknagar|Ashoknagar",
        "balaghat|Balaghat",
        "barwani|Barwani",
        "betul|Betul",
        "bhind|Bhind",
        "bhopal|Bhopal",
        "burhanpur|Burhanpur",
        "chhatarpur|Chattarpur",
        "chhindwara|Chhindwara",
        "damoh|Damoh",
        "datia|Datia",
        "dewas|Dewas",
        "dhar|Dhar",
        "dindori|Dindori",
        "guna|Guna",
        "gwalior|Gwalior",
        "harda|Harda",
        "hoshangabad|Hoshangabad",
        "indore|Indore",
        "jabalpur|Jabalpur",
        "jhabua|Jhabua",
        "katni|Katni",
        "khandwa|Khandwa",
        "khargone|Khargone",
        "mandla|Mandla",
        "mandsaur|Mandsaur",
        "morena|Morena",
        "narsinghpur|Narsinghpur",
        "neemuch|Neemuch",
        "panna|Panna",
        "raiseb|Raisen",
        "rajgarh|Rajgarh",
        "ratlam|Ratlam",
        "rewa|Rewa",
        "sagar|Sagar",
        "satna|Satna",
        "sehore|Sehore",
        "seoni|Seoni",
        "shahdol|Shahdol",
        "shajapur|Shajapur",
        "dheopur|Sheopur",
        "shivpuri|SHivpuri",
        "sidhi|Sidhi",
        "singrauli|Singrauli",
        "tikamgarh|Tikamgarh",
        "ujjain|Ujjain",
        "umaria|Umaria",
        "vidisha|Vidisha",
      ];
    } else if (s7.value === "maharashtra") {
      optionArray = [
        "ahmednagar|Ahmednagar",
        "akola|AKola",
        "amravati|Amravati",
        "aurangabad|Aurangabad",
        "beed|Beed",
        "bhandara|Bhandara",
        "buldhana|Buldhana",
        "chandrapur|Chandrapur",
        "dhule|Dhule",
        "gadchiroli|Gadchiroli",
        "gondia|Gondia",
        "hingoli|Hingoli",
        "jalgaon|Jalgaon",
        "jalna|Jalna",
        "kolhapur|Kolhapur",
        "latur|Latur",
        "mumbai|Mumbai",
        "nagpur|Nagpur",
        "nanded|Nanded",
        "nandurbar|Nandurbar",
        "nashik|Nahsik",
        "osmanabad|Osmanabad",
        "palghar|Palghar",
        "parbhani|Parbhani",
        "pune|Pune",
        "rajgad|Rajgad",
        "ratnagiri|Ratnagiri",
        "sangli|Sangli",
        "satara|Satara",
        "sindhudurg|Sindhudurg",
        "solapur|Solapur",
        "thane|Thane",
        "wardha|Wardha",
        "washim|Washim",
        "yavatmal|Yavatmal",
      ];
    } else if (s7.value === "manipur") {
      optionArray = [
        "bishnupur|Bishnupur",
        "chandel|Chandel",
        "churachandpur|Churanchandpur",
        "imphal east|Imphal East",
        "imphal west|Imphal West",
        "jiribam|Jiribam",
        "kakching|Kakching",
        "kamjong|Kamjong",
        "kangpokpi|Kanhpokpi",
        "noney|Noney",
        "pherzawl|Pherzawl",
        "senapati|Senapati",
        "tamenglong|Tamenglong",
        "tengnoupal|Tengnoupal",
        "thoubal|Thoubal",
        "ukhrul|Ukhrul",
      ];
    } else if (s7.value === "meghalaya") {
      optionArray = [
        "east garo hills|East Garo Hills",
        "east jaintia hills|East Jaintia Hills",
        "east khasi hills|East Khasi Hills",
        "north garo hills|North Garo Hills",
        "ri-bhoi|Ri-Bhoi",
        "south garo hills|SOuth Garo Hills",
        "south west khasi hills|South West Khasi Hills",
        "west garo hills|West Garo Hills",
        "west jaintia hills|West Jaintia Hills",
        "west khasi hills|West Khasi Hills",
      ];
    } else if (s7.value === "mizoram") {
      optionArray = [
        "aizawl east|Aizawl East",
        "aizawl west|Aizawl West",
        "champhai|Champhai",
        "kolasib|Kolasib",
        "lawngtai|Lawngtai",
        "lunglei|Lunglei",
        "mamit|Mamit",
        "serchhip|Serchhip",
        "siaha|Siaha",
      ];
    } else if (s7.value === "nagaland") {
      optionArray = [
        "dimapur|Dimapur",
        "kiphire|Kiphire",
        "kohima|Kohima",
        "longleng|Longleng",
        "mokokchung|Mokokchung",
        "mon|Mon",
        "peren|Peren",
        "phek|Phek",
        "tuensang|Tuensang",
        "wokha|Wokha",
        "zunheboto|Zunheboto",
      ];
    } else if (s7.value === "odisha") {
      optionArray = [
        "angul|Angul",
        "balangir|Balangir",
        "balasore|Balasore",
        "bargarh|Bargarh",
        "bhadrak|Bhadrak",
        "boudh|Boudh",
        "cuttack|Cuttack",
        "deogarh|Deogarh",
        "dhenkanal|Dhenkanal",
        "gajapati|Gajapati",
        "ganjam|Ganjam",
        "jagatsinghpur|Jagatsinghpur",
        "jajpur|Jajpur",
        "jharsuguda|Jharsuguda",
        "kalahandi|Kalahandi",
        "kandhamal|Kandhamal",
        "kendrapara|Kendrapara",
        "kendujhar|Kendujhar",
        "khurda|Khurda",
        "koraput|Koraput",
        "malkangiri|Malkangiri",
        "mayurbhanj|Mayurbhanj",
        "nabarangpur|Nabarangpur",
        "nayagarh|Nayagarh",
        "nuapada|Nuapada",
        "puri|Puri",
        "rayagada|Rayagada",
        "sambalpur|Sambalpur",
        "subarnapur|Subarnapur",
        "sundargarh|Sundargarh",
      ];
    } else if (s7.value === "puducherry") {
      optionArray = [
        "karaikal|Karaikal",
        "mahe|Mahe",
        "puducherry|Puducherry",
        "yanam|Yanam",
      ];
    } else if (s7.value === "punjab") {
      optionArray = [
        "amritsar|Amritsar",
        "barnala|Barnala",
        "bathinda|Bathinda",
        "faridkot|Faridkot",
        "fatehgarh sahib|Fatehgarh Sahib",
        "fazilka|Fazilka",
        "ferozpur|Ferozpur",
        "gurdaspur|Gurdaspur",
        "hishiarpur|Hoshiarpur",
        "jalandhar|Jalandhar",
        "kapurthala|Kapurthala",
        "ludhiana|Ludhiana",
        "mansa|mansa",
        "moga|Moga",
        "pathankot|Pathankot",
        "patiala|Patiala",
        "rup nagar|Rup Nagar",
        "sangrur|Sangrur",
        "sas nagar|SAS Nagar",
        "sbs nagar|SBS Nagar",
        "sri mukhtsar sahib|Sri Muktsar Sahib",
        "tarn taran|Tarn Taran",
      ];
    } else if (s7.value === "rajasthan") {
      optionArray = [
        "ajmer|Ajmer",
        "alwar|Alwar",
        "banswara|Banswara",
        "baran|Baran",
        "barmer|Barmer",
        "bharatpur|Bharatpur",
        "bhilwara|Bhilwara",
        "bikaner|Bikaner",
        "bundu|Bundi",
        "chittorgarh|Chittorgarh",
        "churu|Churu",
        "dausa|Dausa",
        "dholpur|Dholpur",
        "dungarpur|Dungarpur",
        "hanumangarh|Hanumangarh",
        "jaipur I|Jaipur I",
        "jaipur II|Jaipur II",
        "jaisalmer|Jaisalmer",
        "jalore|Jalore",
        "jhalawar|Jhalawar",
        "jhunjhunu|Jhunjhunu",
        "jodhpur|Jodhpur",
        "karauli|Karauli",
        "kota|Kota",
        "nagaur|Nagaur",
        "pali|Pali",
        "pratapgarh|Pratapgarh",
        "rajsamand|Rajsamand",
        "sawai madhopur|Sawai Madhopur",
        "sikar|Sikar",
        "sirohi|Sirohi",
        "sri ganganagar|Sri Ganganagar",
        "tonk|Tonk",
        "udaipur|Udaipur",
      ];
    } else if (s7.value === "sikkim") {
      optionArray = [
        "east sikkim|East Sikkim",
        "north sikkim|North Sikkim",
        "south sikkim|South Sikkim",
        "west sikkim|West Sikkim",
      ];
    } else if (s7.value === "tamil nadu") {
      optionArray = [
        "aranthangi|Aranthangi",
        "ariyalur|Ariyalur",
        "attur|Attur",
        "chengalpet|Chengalpet",
        "chennai|chennai",
        "cheyyar|Cheyyar",
        "coimbatore|Coimbatore",
        "cuddalore|Cuddalore",
        "dharmapuri|Dharmapuri",
        "dindigul|DIndigul",
        "erode|Erode",
        "kallakurichi|Kallakurichi",
        "kanchipuram|Kanchipuram",
        "kanyakumari|Kanyakumari",
        "karur|Karur",
        "kovilpatti|Kovilpatti",
        "krishnagiri|Krishnagiri",
        "madurai|Madurai",
        "nagapattinam|Nagapattinam",
        "namakkal|Namakkal",
        "nilgiris|Nilgiris",
        "palani|Palani",
        "paramakudi|Paramakudi",
        "perambalur|Perambalur",
        "poonamallee|Poonamallee",
        "pudukkottai|Pudukkottai",
        "ramanathapuram|Ramanathapuram",
        "ranipet|Ranipet",
        "salem|Salem",
        "sivaganga|Sivaganga",
        "sivakasi|Sivakasi",
        "tenkasi|Tenkasi",
        "thanjavur|Thanjavur",
        "theni|Theni",
        "thoothukudi(tuticorin)|Thoothukudi(Tuticorin)",
        "tiruchirappalli|Tiruchirappalli",
        "tirunelvelli|Tirunelvelli",
        "tirupattur|Tirupattur",
        "tiruppur|Tiruppur",
        "tiruvaluur|Tiruvallur",
        "tiruvannamalai|Tiruvannamalai",
        "tiruvarur|Tiruvarur",
        "vellore|Vellore",
        "viluppuram|Viluppuram",
        "virudhunagar|Virudhunagar",
      ];
    } else if (s7.value === "telangana") {
      optionArray = [
        "adilabad|Adilabad",
        "bhadradri kothagudem|Bhadradi Kothagudem",
        "hyderabad|Hyderabad",
        "jagtial|Jagtial",
        "jangaon|Jangaon",
        "jayashankar bhupalpally|Jayashankar Bhupalpally",
        "jogulamba gadwal|Jogulamba Gadwal",
        "kamareddy|Kamareddy",
        "karimnagar|Karimnagar",
        "khammam|Khammam",
        "kumuram bheem|Kumuram Bheem",
        "mahbubabad|Mahabubabad",
        "mahabubnagar|mahabubnagar",
        "mancherial|Mancherial",
        "medak|Medak",
        "medchal|Medchal",
        "mulugu|Mulugu",
        "nagarkurnool|Nagarkurnool",
        "nalgonda|Nalgonda",
        "narayanpet|Narayanpet",
        "nirmal|Nirmal",
        "nizamabad|Nizamabad",
        "peddapalli|Peddapalli",
        "rajanna sircilla|Rajanna Sircilla",
        "rangareddy|Rangareddy",
        "sangareddy|Sangareddy",
        "siddipet|Siddipet",
        "suryapet|Suryapet",
        "vikarabad|Vikarabad",
        "wanaparthy|Wanaparthy",
        "warangal(rural)|Warangal(Rural)",
        "warangal(urban)|Warangal(Urban)",
        "yadadri bhuvanagiri|Yadadri Bhuvanagiri",
      ];
    } else if (s7.value === "tripura") {
      optionArray = [
        "dhalai|Dhalai",
        "gomati|Gomati",
        "khowai|Khowai",
        "north tripura|North Tripura",
        "sepahijala|Sepahijala",
        "south tripura|South Tripura",
        "unakoti|Unakoti",
        "west tripura|West Tripura",
      ];
    } else if (s7.value === "uttar pradesh") {
      optionArray = [
        "agra|Agra",
        "aligarh|Aligarh",
        "ambedkar nagar|Ambedkar Nagar",
        "amethi|Amethi",
        "amroha|Amroha",
        "auraiya|Auraiya",
        "ayodhya|Ayodhya",
        "azamgarh|Azamgarh",
        "badaun|Badaun",
        "baghpat|Baghpat",
        "bahraich|Bahraich",
        "balarampur|Balarampur",
        "ballia|Ballia",
        "banda|Banda",
        "barabanki|Barabanki",
        "bareilly|Bareilly",
        "basti|Basti",
        "bhadohi|Bhadohi",
        "bijnour|Bijnour",
        "bulandshahr|Bulandshahr",
        "chandauli|Chandauli",
        "chitrakoot|Chitrakoot",
        "deoria|Deoria",
        "etah|Etah",
        "etawah|Etawah",
        "farrukhabad|Farrukhabad",
        "fatehpur|Fatehpur",
        "firozabad|Firozabad",
        "gautam buddha nagar|Gautam Buddha Nagar",
        "ghaziabad|Ghaziabad",
        "ghazipur|Ghazipur",
        "gonda|Gonda",
        "gorakhpur|Gorakhpur",
        "hamirpur|Hamirpur",
        "hapur|Hapur",
        "hardoi|Hardoi",
        "hathras|Hathras",
        "jalaun|Jalaun",
        "jaunpur|Jaunpur",
        "jhansi|Jhansi",
        "kannauj|Kannauj",
        "kanpur dehat|Kanpur Dehat",
        "kanpur nagar|Kanpur Nagar",
        "kasganj|Kasganj",
        "kaushambi|Kaushambi",
        "kushinagar|Kushinagar",
        "lakhimpur kheri|Lakhimpur Kheri",
        "lalitpur|Lalitpur",
        "lucknow|Lucknow",
        "maharajganj|Maharajganj",
        "mahoba|Mahoba",
        "mainpuri|Mainpuri",
        "mathura|mathura",
        "mau|Mau",
        "meerut|Meerut",
        "mirzapur|Mirzapur",
        "moradabad|Moradabad",
        "muzaffarnagar|Muzaffarnagar",
        "pilibhit|Pilibhit",
        "pratapgarh|Pratapgarh",
        "prayagraj|Prayagraj",
        "raebareli|Raebareli",
        "rampur|Rampur",
        "saharanpur|Saharanpur",
        "sambhal|Sambhal",
        "sant kabir nagar|Sant Kabir Nagar",
        "shahjahanpur|Shahjahanpur",
        "shamli|Shamli",
        "shravasti|Shravasti",
        "siddharthnagar|Siddharthnagar",
        "sitapur|Sitapur",
        "sonbhadra|Sonbhadra",
        "sultanpur|Sultanpur",
        "unnao|Unnao",
        "varanasi|Varnasi",
      ];
    } else if (s7.value === "uttarakhand") {
      optionArray = [
        "almora|Almora",
        "bageshwar|Bageshwar",
        "chamoli|Chamoli",
        "champawat|Champawat",
        "dehradun|Dehradun",
        "haridwar|Haridwar",
        "nainital|Nainital",
        "pauri garhwal|Pauri Garhwal",
        "pithoragarh|Pithoragarh",
        "rudraprayag|Rudraprayag",
        "tehri garhwal|Tehri Garhwal",
        "udha, dingh nagar|Udham Singh Nagar",
        "uttarkashi|Uttarkashi",
      ];
    } else if (s7.value === "west bengal") {
      optionArray = [
        "alipurduar district|Alipurduar District",
        "bankura|Bankura",
        "basirhat hd(north 24 parganas)|Basirhat HD(North 24 Pargana)",
        "birbhum|Birbhum",
        "bishnupur hd(bankura)|Bishnupur HD(Bankura)",
        "coochbehar|Coochbehar",
        "dakshin dinajpur|Dakshin DInajpur",
        "darjeeling|Darjeeling",
        "diamond harbor hd(south 24 pargana)|Diamond Harbor HD(South 24 Pargana)",
        "east bardhaman|East Bardhaman",
        "hoogly|Hoogly",
        "howrah|Howrah",
        "jalpaiguri|Jalpaiguri",
        "jhargram|Jhargram",
        "kalimpong|Kalimpong",
        "kolkata|Kolkata",
        "malda|Malda",
        "murshidabad|Murshidabad",
        "nadia|Nadia",
        "nandigram hd(east medinipore)|Nandigram HD(East Medinipore)",
        "north 24 parganas|North 24 Parganas",
        "paschim medinipore|Paschim MEdinipore",
        "purba medinipore|Purba Medinipore",
        "purulia|Purulia",
        "rampurhat hd(birbhum)|Rampurhat HD(Birbhum)",
        "south 24 parganas|South 24 Parganas",
        "uttar dinajpur|Uttar Dinajpur",
        "west bardhaman|West Bardhaman",
      ];
    }
    let District = [];
    for (let option in optionArray) {
      var pair = optionArray[option].split("|");
      District.push(pair);
    }
    if (forWhat === 1) {
      setDistrict(District);
    } else {
      setDeceasedDistrict(District);
    }
  }

  const handleApplicantInput = (e) => {
    setApplicantField({ ...applicantField, [e.target.name]: e.target.value });
    if (e.target.name === "state") populate(e.target.value, 1);
  };

  const handleDeceasedInput = (e) => {
    setDeceasedField({ ...deceasedField, [e.target.name]: e.target.value });
    if (e.target.name === "deceasedstate") populate(e.target.value, 2);
  };

  // Form Data Submission
  const submitFormData = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      applicantField.firstname = user.firstname;
      applicantField.lastname = user.lastname;
      applicantField.email = user.email;
      applicantField.mobile = user.mobile;
      setApplicantFormErrors(validateApplicant(applicantField));
      const res = await createApplicant(applicantField);

      if (res.error) {
        alert(res.error);
      }
    } catch (error) {
      return alert(error.message);
    }
    try {
      setDeceasedFormErrors(validateDeceased(deceasedField));
      const obj = validateDeceased(deceasedField);
      deceasedField.signature = Files.signature;
      deceasedField.otherDocuments = Files.otherDocuments;
      deceasedField.goanburahCertificate = Files.goanburahCertificate;
      deceasedField.deathCertificate = Files.goanburahCertificate;
      if (Object.keys(obj).length === 0) {
        setSubmittingFromData(true);
        const res = await createDeceased(deceasedField);
        setSubmittingFromData(false);
        if (res.error && res.error.data.code === 11000) {
          if (res.error.data.keyPattern.aadhar === 1) {
            toast.error("Record of Deceased already there");
          }
        } else if (res.error) {
          alert(res.error);
        } else {
          toast.success("Form Submitted Successfully.");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } else {
        alert("Please Enter the required field(s)");
      }
    } catch (error) {
      return alert(error.message);
    }
  };

  const validateApplicant = (values) => {
    const error = {};
    const regexPan = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    const regexAadhar =
      /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

    if (
      !values.gender ||
      values.gender === "null" ||
      values.gender === "" ||
      values.gender.length === 0
    ) {
      error.gender = "Gender is required";
    }

    if (
      values.pan ||
      values.pan !== "null" ||
      values.pan !== "" ||
      values.pan.length !== 0
    ) {
      if (!regexPan.test(values.pan)) {
        error.pan = "This is not a valid pan number format!";
      }
    }

    if (
      values.aadhar ||
      values.aadhar !== "null" ||
      values.aadhar !== "" ||
      values.aadhar.length !== 0
    ) {
      if (!regexAadhar.test(values.aadhar)) {
        error.aadhar = "This is not a valid aadhar format!";
      }
    }

    if (
      !values.state ||
      values.state === "null" ||
      values.state === "" ||
      values.state.length === 0
    ) {
      error.state = "State is required!";
    }

    if (
      !values.district ||
      values.district === "null" ||
      values.district === "" ||
      values.district.length === 0
    ) {
      error.district = "District is required!";
    }

    if (
      !values.subdivision ||
      values.subdivision === "" ||
      values.subdivision === "null" ||
      values.subdivision.length === 0
    ) {
      error.subdivision = "Please fill out the above field!";
    }
    if (
      !values.circleoffice ||
      values.circleoffice === "" ||
      values.circleoffice === "null" ||
      values.circleoffice.length === 0
    ) {
      error.circleoffice = "Please fill out the above field!";
    }

    return error;
  };

  const validateDeceased = (values) => {
    const error = {};
    const regexAadhar =
      /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
    const regexName = /^[a-zA-Z ]{2,30}$/;

    if (
      !values.aadhar ||
      values.aadhar === "" ||
      values.aadhar === "null" ||
      values.aadhar.length === 0
    ) {
      error.aadhar = "Aadhar is required!";
    } else if (!regexAadhar.test(values.aadhar)) {
      error.aadhar = "This is not a valid aadhar format!";
    }

    if (
      !values.deadname ||
      values.deadname === "" ||
      values.deadname === "null" ||
      values.deadname.length === 0
    ) {
      error.deadname = "Name of deceased is required!";
    } else if (!regexName.test(values.deadname)) {
      error.deadname = "Invalid name!";
    }

    if (
      !values.gender ||
      values.gender === "null" ||
      values.gender === "" ||
      values.gender.length === 0
    ) {
      error.gender = "Gender is required!";
    }

    if (values.father || values.father !== "" || values.father.length !== 0) {
      if (!regexName.test(values.father)) {
        error.father = "Invalid name";
      }
    }

    if (values.mother || values.mother !== "" || values.mother.length !== 0) {
      if (!regexName.test(values.mother)) {
        error.mother = "Invalid name!";
      }
    }

    if (values.spouse || values.spouse !== "" || values.spouse.length !== 0) {
      if (!regexName.test(values.spouse)) {
        error.spouse = "Invalid name!";
      }
    }

    if (
      values.age ||
      values.age !== "null" ||
      values.age !== "" ||
      values.age.length !== 0
    ) {
      if (values.age < 0 || values.age > 100) {
        error.age = "Invalid age!";
      }
    } else {
      error.age = "Please enter the age of deceased at the time of death!";
    }

    if (
      !values.placeOfDeath ||
      values.placeOfDeath === "null" ||
      values.placeOfDeath === "" ||
      values.placeOfDeath.length === 0
    ) {
      error.placeOfDeath = "Please choose a place of death!";
    }

    if (
      values.informantName ||
      values.informantName !== "" ||
      values.informantName.length !== 0
    ) {
      if (!regexName.test(values.informantName)) {
        error.informantName = "Invalid name!";
      }
    }

    if (
      !values.townOrVillage ||
      values.townOrVillage === "null" ||
      values.townOrVillage === "" ||
      values.townOrVillage.length === 0
    ) {
      error.townOrVillage = "Please choose an option!";
    }

    if (
      !values.deceasedstate ||
      values.deceasedstate === "null" ||
      values.deceasedstate === "" ||
      values.deceasedstate.length === 0
    ) {
      error.deceasedstate = "State is required!";
    }

    if (
      !values.district ||
      values.district === "null" ||
      values.district === "" ||
      values.district.length === 0
    ) {
      error.district = "District is required!";
    }

    if (
      !values.religion ||
      values.religion === "null" ||
      values.religion === "" ||
      values.religion.length === 0
    ) {
      error.religion = "Please choose a religion!";
    }

    if (
      !values.occupation ||
      values.occupation === "" ||
      values.occupation === "null" ||
      values.occupation.length === 0
    ) {
      error.occupation = "Occupation of deceased is required!";
    } else if (!regexName.test(values.occupation)) {
      error.occupation = "Invalid Occupation!";
    }

    if (
      !values.typeOfMedicalAttention ||
      values.typeOfMedicalAttention === "null" ||
      values.typeOfMedicalAttention === "" ||
      values.typeOfMedicalAttention.length === 0
    ) {
      error.typeOfMedicalAttention = "Required!";
    }

    if (
      values.medicallyCertified !== "true" &&
      values.medicallyCertified !== "false"
    ) {
      error.medicallyCertified =
        "Please choose whether death is medically certified or not!";
    }

    if (
      values.smoker ||
      values.smoker !== "null" ||
      values.smoker !== "" ||
      values.smoker.length !== 0
    ) {
      if (values.smoker < 0) {
        error.smoker =
          "Please enter a valid number greater than or equal to 0!";
      } else if (values.smoker > deceasedField.age) {
        error.smoker =
          "Please enter a valid number less than or equal to the age of the deceased!";
      }
    }

    if (
      values.tobacco ||
      values.tobacco !== "null" ||
      values.tobacco !== "" ||
      values.tobacco.length !== 0
    ) {
      if (values.tobacco < 0) {
        error.tobacco =
          "Please enter a valid number greater than or equal to 0!";
      } else if (values.tobacco > deceasedField.age) {
        error.tobacco =
          "Please enter a valid number less than or equal to the age of the deceased!";
      }
    }

    if (
      values.panmasala ||
      values.panmasala !== "null" ||
      values.panmasala !== "" ||
      values.panmasala.length !== 0
    ) {
      if (values.panmasala < 0) {
        error.panmasala =
          "Please enter a valid number greater than or equal to 0!";
      } else if (values.panmasala > deceasedField.age) {
        error.panmasala =
          "Please enter a valid number less than or equal to the age of the deceased!";
      }
    }

    if (
      values.drinker ||
      values.drinker !== "null" ||
      values.drinker !== "" ||
      values.drinker.length !== 0
    ) {
      if (values.drinker < 0) {
        error.drinker =
          "Please enter a valid number greater than or equal to 0!";
      } else if (values.drinker > deceasedField.age) {
        error.drinker =
          "Please enter a valid number less than or equal to the age of the deceased!";
      }
    }

    return error;
  };
  function onChange(value) {
    setCaptchaValue(value);
    console.log("Captcha value:", value);
  }
  return (
    <>
      {/* <FormNav /> */}
      <ToastContainer />
      <div className="Formcontainer" style={{ marginBottom: "70px" }}>
        <div className="note" id="print">
          <h6>
            Note: Fields marked with asterisks (
            <b style={{ color: "rgb(255, 8, 8)" }}> * </b>) are mandatory
          </h6>
          <span
            className="material-icons"
            aria-hidden="true"
            style={{
              cursor: "pointer",
              float: "right",
              marginTop: "20px",
              marginRight: "10px",
              marginBottom: "0",
              marginLeft: "0",
              color: "yellowgreen",
            }}
            onClick={handlePrint}
          >
            &#xe8ad;
          </span>
        </div>

        <Form onSubmit={submitFormData} ref={ComponentRef}>
          <div className="formheading">
            <h4>Death Certificate Application Form</h4>
          </div>
          {/* form part 1 starts */}
          <div className="descrip">
            <b>
              <u>Applicant's Details</u>
            </b>
          </div>
          <div className="conatinerFluid">
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Applicant's Name
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={user.firstname}
                    disabled
                  />
                </Col>
                <Col xs={3}>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={user.lastname}
                    required
                    disabled
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Applicant Gender
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select name="gender" onChange={handleApplicantInput}>
                    <option value="null">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.gender}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Mobile Number
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="tel"
                    maxLength="10"
                    name="mobile"
                    value={user.mobile}
                    disabled
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>PAN number</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(PAN Number)"
                    maxLength="10"
                    name="pan"
                    onChange={handleApplicantInput}
                  />
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.pan}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  {" "}
                  <Form.Label>Upload PAN Card</Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    name="applicantPanCard"
                    accept="image/*"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "applicantPanCard" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.applicantPanCard !== "" && (
                    <a href={Files.applicantPanCard} target ="_blank">
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Aadhar card Number</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(Aadhar card Number)"
                    maxLength="14"
                    name="aadhar"
                    onChange={handleApplicantInput}
                  />
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.aadhar}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  {" "}
                  <Form.Label>Upload Aadhar</Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    name="applicantAadhar"
                    accept="image/*"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "applicantAadhar" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.applicantAadhar !== "" && (
                    <a href={Files.applicantAadhar} target ="_blank">
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Email Id</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control type="email" value={user.email} disabled />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
          </div>

          <div className="descrip">
            <b>
              <u>Address Details of Applicant</u>
            </b>
          </div>

          <div className="conatinerFluid">
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    State<span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select name="state" onChange={handleApplicantInput}>
                    <option value="null">SELECT STATE</option>
                    <option value="andaman and nicobar islands">
                      {" "}
                      ANDAMAN AND NICOBAR ISLANDS
                    </option>
                    <option value="andhra pradesh"> ANDHRA PRADESH</option>
                    <option value="arunachal pradesh">
                      {" "}
                      ARUNACHAL PRADESH
                    </option>
                    <option value="assam"> ASSAM</option>
                    <option value="bihar"> BIHAR</option>
                    <option value="chandigarh"> CHANDIGARH</option>
                    <option value="chattisgarh"> CHATTISGARH</option>
                    <option value="dadra and nagar haveli">
                      {" "}
                      DADRA AND NAGAR HAVELI
                    </option>
                    <option value="daman and diu"> DAMAN AND DIU</option>
                    <option value="delhi"> DELHI</option>
                    <option value="goa"> GOA</option>
                    <option value="gujarat"> GUJARAT</option>
                    <option value="haryana"> HARYANA</option>
                    <option value="himachal pradesh"> HIMACHAL PRADESH</option>
                    <option value="jammu and kashmir">
                      {" "}
                      JAMMU AND KASHMIR
                    </option>
                    <option value="jharkhand"> JHARKHAND</option>
                    <option value="karnataka"> KARNATAKA</option>
                    <option value="kerala"> KERALA</option>
                    <option value="ladakh"> LADAKH</option>
                    <option value="lakshadweep"> LAKSHADWEEP</option>
                    <option value="madhya pradesh"> MADHYA PRADESH</option>
                    <option value="maharashtra"> MAHARASHTRA</option>
                    <option value="manipur"> MANIPUR</option>
                    <option value="meghalaya"> MEGHALAYA</option>
                    <option value="mizoram">MIZORAM</option>
                    <option value="nagaland"> NAGALAND</option>
                    <option value="odisha"> ODISHA</option>
                    <option value="puducherry">PUDUCHERRY </option>
                    <option value="punjab"> PUNJAB</option>
                    <option value="rajasthan"> RAJASTHAN</option>
                    <option value="sikkim"> SIKKIM</option>
                    <option value="tamil nadu"> TAMIL NADU</option>
                    <option value="telangana"> TELANGANA</option>
                    <option value="tripura"> TRIPURA</option>
                    <option value="uttar pradesh"> UTTAR PRADESH</option>
                    <option value="uttarakhand"> UTTARAKHAND</option>
                    <option value="west bengal">WEST BENGAL</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.state}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    District<span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select name="district" onChange={handleApplicantInput}>
                    <option value="">Select District</option>
                    {district.map((item, index) => (
                      <option key={item[0]} value={item[0]}>
                        {item[1]}
                      </option>
                    ))}
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.district}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Sub-Division
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(Sub-division)"
                    name="subdivision"
                    onChange={handleApplicantInput}
                    value={applicantField.subdivision}
                  />
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.subdivision}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Circle Office
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(Circle Office)"
                    name="circleoffice"
                    onChange={handleApplicantInput}
                    value={applicantField.circleoffice}
                  />
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.circleoffice}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
          </div>

          {/* form part 1 ends  */}

          {/* form part 2 starts */}
          <div className="descrip">
            <b>
              <u>Deceased Details</u>
            </b>
          </div>
          <div className="conatinerFluid">
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Aadhar card Number of the deceased
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(Aadhar card Number)"
                    maxLength="14"
                    name="aadhar"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.aadhar}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  {" "}
                  <Form.Label>Upload Aadhar</Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    name="deceasedAadhar"
                    accept="image/*"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "deceasedAadhar" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.deceasedAadhar !== "" && (
                    <a href={Files.deceasedAadhar} target ="_blank">
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Date of Death
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="date"
                    name="date"
                    format="dd/mm/yyyy"
                    max={new Date().toJSON().slice(0, 10)}
                    onChange={handleDeceasedInput}
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Name of Deceased
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="deadname"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.deadname}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Gender of Deceased
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select name="gender" onChange={handleDeceasedInput}>
                    <option value="null">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.gender}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Name of Father</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="father"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.father}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Name of Mother</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="mother"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.mother}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Name of Husband/wife</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="spouse"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.spouse}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Age of Deceased [on January 1 of the current calender]
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    type="number"
                    placeholder="Age"
                    name="age"
                    // min={0}
                    // max={200}
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>{deceasedFormErrors.age}</span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Place of Death
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="placeOfDeath"
                    onChange={handleDeceasedInput}
                  >
                    <option value="null">Select</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Institution">Institution</option>
                    <option value="Home">House</option>
                    <option value="other">Other Place</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.placeOfDeath}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Place Details (Name or Address)
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="placedetails"
                    onChange={handleDeceasedInput}
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Informants Name</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="informantName"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.informantName}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Informant's Relation with Deceased</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="informantRelation"
                    onChange={handleDeceasedInput}
                  >
                    <option value="null">Select</option>
                    <option value="relative">Relative</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased Town/Village Name:
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="torvName"
                    onChange={handleDeceasedInput}
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Is it Town/Village
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="townOrVillage"
                    onChange={handleDeceasedInput}
                  >
                    <option value="null">Select</option>
                    <option value="Town">Town</option>
                    <option value="Village">Village</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.townOrVillage}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased State
                    <span style={{ color: "rgb(255, 8, 8)" }}>* </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="deceasedstate"
                    onChange={handleDeceasedInput}
                  >
                    <option>SELECT STATE</option>
                    <option value="andaman and nicobar islands">
                      {" "}
                      ANDAMAN AND NICOBAR ISLANDS
                    </option>
                    <option value="andhra pradesh"> ANDHRA PRADESH</option>
                    <option value="arunachal pradesh">
                      {" "}
                      ARUNACHAL PRADESH
                    </option>
                    <option value="assam"> ASSAM</option>
                    <option value="bihar"> BIHAR</option>
                    <option value="chandigarh"> CHANDIGARH</option>
                    <option value="chattisgarh"> CHATTISGARH</option>
                    <option value="dadra and nagar haveli">
                      {" "}
                      DADRA AND NAGAR HAVELI
                    </option>
                    <option value="daman and diu"> DAMAN AND DIU</option>
                    <option value="delhi"> DELHI</option>
                    <option value="goa"> GOA</option>
                    <option value="gujarat"> GUJARAT</option>
                    <option value="haryana"> HARYANA</option>
                    <option value="himachal pradesh"> HIMACHAL PRADESH</option>
                    <option value="jammu and kashmir">
                      {" "}
                      JAMMU AND KASHMIR
                    </option>
                    <option value="jharkhand"> JHARKHAND</option>
                    <option value="karnataka"> KARNATAKA</option>
                    <option value="kerala"> KERALA</option>
                    <option value="ladakh"> LADAKH</option>
                    <option value="lakshadweep"> LAKSHADWEEP</option>
                    <option value="madhya pradesh"> MADHYA PRADESH</option>
                    <option value="maharashtra"> MAHARASHTRA</option>
                    <option value="manipur"> MANIPUR</option>
                    <option value="meghalaya"> MEGHALAYA</option>
                    <option value="mizoram">MIZORAM</option>
                    <option value="nagaland"> NAGALAND</option>
                    <option value="odisha"> ODISHA</option>
                    <option value="puducherry">PUDUCHERRY </option>
                    <option value="punjab"> PUNJAB</option>
                    <option value="rajasthan"> RAJASTHAN</option>
                    <option value="sikkim"> SIKKIM</option>
                    <option value="tamil nadu"> TAMIL NADU</option>
                    <option value="telangana"> TELANGANA</option>
                    <option value="tripura"> TRIPURA</option>
                    <option value="uttar pradesh"> UTTAR PRADESH</option>
                    <option value="uttarakhand"> UTTARAKHAND</option>
                    <option value="west bengal">WEST BENGAL</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.deceasedstate}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased District
                    <span style={{ color: "rgb(255, 8, 8)" }}>* </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select name="district" onChange={handleDeceasedInput}>
                    <option value="null">Choose District</option>
                    {deceasedDistrict.map((item, index) => (
                      <option key={item[0]} value={item[0]}>
                        {item[1]}
                      </option>
                    ))}
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.district}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased Address at the time of Death
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="(In English)"
                    name="addressAtDead"
                    onChange={handleDeceasedInput}
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased Permanent Address:
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="(In English)"
                    name="addressPermanent"
                    onChange={handleDeceasedInput}
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased Religion
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select name="religion" onChange={handleDeceasedInput}>
                    <option value="null">Select</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.religion}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased Occupation
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="occupation"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.occupation}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Type of Medical Attention received before death
                    <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Select
                    name="typeOfMedicalAttention"
                    onChange={handleDeceasedInput}
                  >
                    <option value="null">Select</option>
                    <option value="Institutional">Institutional</option>
                    <option value="Medical Other than Institution">
                      Medical Other than Institution
                    </option>
                    <option value="none">No Medical Attention</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.typeOfMedicalAttention}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Death Cause Medically Certified
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Check
                    label="Yes"
                    type="radio"
                    value="true"
                    name="medicallyCertified"
                    onChange={handleDeceasedInput}
                    style={{ marginTop: "2px" }}
                  />
                  <Form.Check
                    label="No"
                    type="radio"
                    value="false"
                    name="medicallyCertified"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.medicallyCertified}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Cause of Death
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select name="disease" onChange={handleDeceasedInput}>
                    <option value="null">Select</option>
                    <option value="COVID-19">COVID-19</option>
                    <option value="Cancer">Cancer</option>
                    <option value="Organ Failure">Organ Failure</option>
                    <option value="Dengu">Dengu</option>
                    <option value="Malaria">Malaria</option>
                    <option value="Natural Calamity">Natural Calamity</option>
                    <option value="Pregnancy">Pregnancy</option>
                    <option value="Accident">Accident</option>
                    <option value="Suicide">Suicide</option>
                    <option value="Narcotics">Narcotics</option>
                    <option value="Heart  Attack">Heart Attack</option>
                    <option value="other">others</option>
                  </Form.Select>
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    If Habitual Smoker then for how many years
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    name="smoker"
                    // min={0}
                    // max={deceasedField.age}
                    onChange={handleDeceasedInput}
                    type="number"
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.smoker}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    If Habitual Tobacco Chewer in any form for how many years
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="number"
                    name="tobacco"
                    // min={0}
                    // max={deceasedField.age}
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.tobacco}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    If Habitual Arecanut(including Panmasala) user for how many
                    years
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    name="panmasala"
                    onChange={handleDeceasedInput}
                    type="number"
                    // min={0}
                    // max={deceasedField.age}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.panmasala}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    If Habitual Drinker for how many years
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="number"
                    name="drinker"
                    // min={0}
                    // max={deceasedField.age}
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.drinker}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    If Female death, did death occur while Pregnant at time of
                    delivery or 6 weeks after end of Pregnancy
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Check
                    label="Yes"
                    type="radio"
                    id="yes"
                    value="true"
                    name="pregnancydeath"
                    onChange={handleDeceasedInput}
                    style={{ marginTop: "2px" }}
                    disabled={deceasedField.gender === "male"}
                  />
                  <Form.Check
                    label="No"
                    default="false"
                    type="radio"
                    id="no"
                    value="false"
                    name="pregnancydeath"
                    onChange={handleDeceasedInput}
                    disabled={deceasedField.gender === "male"}
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Signature of the Applicant
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    name="signature"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "signature" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.signature !== "" && (
                    <a href={Files.signature}>
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>
          </div>

          {/* form part 3 starts */}

          <div className="descrip">
            Upload supporting documents (Supported formats .jpeg/jpg/png) (max.
            2MB)
          </div>

          <div className="conatinerFluid">
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Certificate of Death issued from Private Hospital/Nursing
                    home
                  </Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    name="deathCertificate"
                    accept="image/*"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "deathCertificate" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.deathCertificate !== "" && (
                    <a href={Files.deathCertificate}>
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Goanburah Certificate</Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    name="goanburahCertificate"
                    accept="image/*"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "goanburahCertificate" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.goanburahCertificate !== "" && (
                    <a href={Files.goanburahCertificate}>
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  {" "}
                  <Form.Label>Other Documents</Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    name="otherDocuments"
                    accept="image/*"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "otherDocuments" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.otherDocuments !== "" && (
                    <a href={Files.otherDocuments}>
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>
          </div>

          {/* <!-- form part 3 ends --> */}

          {/* <!-- form part 4 starts --> */}

          <hr />

          <div className="conatinerFluid">
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Location{" "}
                    <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control type="text" placeholder="Location" />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Date <span style={{ color: "rgb(255, 8, 8)" }}> * </span>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  {" "}
                  <Form.Control
                    type="date"
                    name="signatureDate"
                    format="dd/mm/yyyy"
                    max={new Date().toJSON().slice(0, 10)}
                    onChange={handleDeceasedInput}
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
          </div>

          <hr />
          <div style={{ marginLeft: "3%" }} className="my-2">
            <ReCAPTCHA
              sitekey="6Ld8Q9QgAAAAAFQ4f1dnE8tDPpt-Eh1WbXKPjGWj"
              onChange={onChange}
            />
          </div>

          <Row style={{ width: "50%", textAlign: "center" }}>
            <Col>
              <Button
                variant="danger"
                className="mx-5"
                type="reset"
                value="Reset"
              >
                Reset
              </Button>
            </Col>
            <Col>
              {submittingFromData ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Button
                  variant="primary"
                  className="mx-5"
                  value="Reset"
                  type="submit"
                  disabled={captchaValue === null}
                >
                  Submit
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>
      <button
        id="scrollToTopButton"
        title="Go to top"
        className="ml-5"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <i
          className="fa fa-angle-double-up"
          aria-hidden="true"
          style={{ color: "black", fontWeight: "bolder" }}
        ></i>
      </button>
    </>
  );
}
