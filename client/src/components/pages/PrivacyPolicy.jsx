import React from 'react'
import Userlayout from '../layout/Userlayout'
import contactImg from '../../assets/contactBnr.jpg';
const PrivacyPolicy = () => {
    return (
        <Userlayout>
            <div className=''>
                <div className='shadow-md shadow-slate-600'>
                    <img src={contactImg} alt="Contact" className="w-full object-cover" />
                </div>
                <div className="min-h-screen bg-gray-100 p-8 mx-1 sm:mx-5 my-5 shadow-lg rounded-md shadow-white border">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-4xl font-bold text-red-600 text-center mb-6">Privacy Policy</h1>

                        <div className="text-gray-700">
                            {/* <p className="mb-4">Effective date: November 22, 2018</p> */}

                            <p className="mb-4">
                                UMCA ("us", "we", or "our") operates the http://www.umcaeducation.org website and the UMCA mobile application (the "Service").
                            </p>

                            <p className="mb-4">
                                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                            </p>

                            <p className="mb-6">
                                We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
                            </p>

                            <h2 className="text-2xl font-semibold text-blue-950 mb-4">Information Collection And Use</h2>
                            <p className="mb-4">
                                We collect several different types of information for various purposes to provide and improve our Service to you.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Data</h3>
                            <p className="mb-4">
                                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
                            </p>
                            <ul className="list-disc pl-8 mb-6">
                                <li className="mb-2">Email address</li>
                                <li className="mb-2">First name and last name</li>
                                <li className="mb-2">Phone number</li>
                                <li className="mb-2">Address, State, Province, ZIP/Postal code, City</li>
                                <li className="mb-2">Cookies and Usage Data</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Data</h3>
                            <p className="mb-4">
                                We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data").
                            </p>
                            <p className="mb-4">
                                This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                            </p>
                            <p className="mb-6">
                                When you access the Service by or through a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Tracking & Cookies Data</h3>
                            <p className="mb-4">
                                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                            </p>
                            <p className="mb-4">
                                Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
                            </p>
                            <p className="mb-4">
                                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                            </p>
                            <p className="mb-4">Examples of Cookies we use:</p>
                            <br />
                            <ul className="list-disc pl-8 mb-6">
                                <li className="mb-2">
                                    <span className="font-semibold">Session Cookies.</span> We use Session Cookies to operate our Service.
                                </li>
                                <li className="mb-2">
                                    <span className="font-semibold">Preference Cookies.</span> We use Preference Cookies to remember your preferences and various settings.
                                </li>
                                <li className="mb-2">
                                    <span className="font-semibold">Security Cookies.</span> We use Security Cookies for security purposes.
                                </li>
                            </ul>

                            <h2 className="text-2xl font-semibold text-blue-950 mb-4">Use of Data</h2>
                            <p className="mb-4">UMCA uses the collected data for various purposes:</p>
                            <ul className="list-disc pl-8 mb-6">
                                <li className="mb-2">To provide and maintain the Service</li>
                                <li className="mb-2">To notify you about changes to our Service</li>
                                <li className="mb-2">To allow you to participate in interactive features of our Service when you choose to do so</li>
                                <li className="mb-2">To provide customer care and support</li>
                                <li className="mb-2">To provide analysis or valuable information so that we can improve the Service</li>
                                <li className="mb-2">To monitor the usage of the Service</li>
                                <li className="mb-2">To detect, prevent and address technical issues</li>
                            </ul>

                            <h2 className="text-2xl font-semibold text-blue-950 mb-4">Transfer Of Data</h2>
                            <p className="mb-4">
                                Your information, including Personal Data, may be transferred to and maintained on computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from your jurisdiction.
                            </p>
                            <p className="mb-4">
                                If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there.
                            </p>
                            <p className="mb-4">
                                Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
                            </p>
                            <p className="mb-6">
                                UMCA will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
                            </p>

                            <h2 className="text-2xl font-semibold text-blue-950 mb-4">Disclosure Of Data</h2>
                            <p className="mb-4">UMCA may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                            <ul className="list-disc pl-8 mb-6">
                                <li className="mb-2">To comply with a legal obligation</li>
                                <li className="mb-2">To protect and defend the rights or property of UMCA</li>
                                <li className="mb-2">To prevent or investigate possible wrongdoing in connection with the Service</li>
                                <li className="mb-2">To protect the personal safety of users of the Service or the public</li>
                                <li className="mb-2">To protect against legal liability</li>
                            </ul>

                            {/* <h2 className="text-2xl font-semibold text-blue-950 mb-4">Security Of Data</h2>
                            <p className="mb-4">
                                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                            </p>
                            <h2 className="text-2xl font-semibold text-blue-950 mb-4">Service Providers</h2>
                            <p className="mb-4">
                                We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
                            </p>
                            <p className="mb-6">
                                These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                            </p>

                            <h2 className="text-2xl font-semibold text-blue-950 mb-4">Links To Other Sites</h2>
                            <p className="mb-4">
                                Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                            </p>
                            <p className="mb-6">
                                We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                            </p> */}

                            {/* <h2 className="text-2xl font-semibold text-blue-950 mb-4">Children's Privacy</h2>
                            <p className="mb-4">Our Service does not address anyone under the age of 18 ("Children").</p>
                            <p className="mb-6">
                                We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
                            </p>

                            <h2 className="text-2xl font-semibold text-blue-950 mb-4">Changes To This Privacy Policy</h2>
                            <p className="mb-4">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            </p>
                            <p className="mb-4">
                                We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.
                            </p>
                            <p className="mb-6">
                                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p> */}

                            <h2 className="text-2xl font-semibold text-blue-950 mb-4">Contact Us</h2>
                            <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
                            <ul className="list-disc pl-8 mb-6">
                                <li className="mb-2">By email: umcafoundation@gmail.com</li>
                                <li className="mb-2">By visiting this page on our website: http://umcaeducation.org</li>
                                <li className="mb-2">By phone number: +91- 9149261291</li>
                                <li className="mb-2">By mail: H.N. 37, 2nd Floor, Near

                                    Alwatiya Hospital Chhama Enclave, Maruti Estate, Shahganj
                                    Agra, UP 282010</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </Userlayout>
    )
}

export default PrivacyPolicy