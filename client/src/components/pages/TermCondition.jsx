import React from 'react';
import Userlayout from '../layout/Userlayout';
import { HiInformationCircle, HiExclamationCircle } from 'react-icons/hi';

const TermCondition = () => {
    return (
        <Userlayout>
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-4xl font-extrabold text-blue-600 mb-10 text-center">Terms and Conditions</h1>

                    <section className="mb-12 border-l-4 border-blue-500 pl-4">
                        <h2 className="text-2xl font-bold text-blue-700 mb-4">Acceptance of this Agreement</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            These terms and conditions ("Terms and Conditions") control your use of this website ("Website").
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            In these Terms and Conditions, "UMCA" is referred to as the "Company", "us," or "we."
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            "You" refers to a user or a paying customer. If you are a company or another person who gives access to Company products, your access is subject to these terms and conditions.
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            If you are accessing the Website from the USA, then UMCA Americas Inc ("UMCA Americas") will be the contracting party. If you are accessing the Website outside the USA, then UMCA Solutions Private Limited ("UMCA India") will be the contracting party. UMCA Americas and UMCA India are collectively referenced as "UMCA."
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            This Website, the services made available through the Website, and the content therein (the "Products") are owned, operated, and maintained, as applicable, by UMCA and its group companies. The Website, Products, and Content are, collectively, the "Company Products."
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            By (a) using or accessing the Company Products (b) accessing any Course through the Website, you agree to the terms and conditions set forth herein ("Agreement"). By using this Website or its Products and Services, you Agree and Warrant that you have read, understood, and agreed to be bound by these terms. Our privacy policy can be found at{' '}
                            <a href="/privacy&policy" className="text-blue-600 underline hover:text-blue-700">
                                Privacy Policy
                            </a>
                            . If you do not accept these terms, you must not use – and are not authorized to use – all or any portion of the Company Products.
                        </p>
                    </section>

                    <h1 className="text-2xl font-bold mb-8 text-gray-800 text-center">
                        Please read this carefully before you use the services of this Website.
                    </h1>

                    <div className="space-y-8">
                        {/* General Terms */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-blue-700 border-b pb-2">General Terms</h2>
                            {[
                                "You should not use this site in an unlawful manner; you must respect the Website Terms and Conditions and follow the Privacy Policy.",
                                "Under no situations or circumstances, will the Company be liable for any change in the content which it provides on the Website through its products and services, including but not limited to any errors, omissions, loss, or damage experienced in connection with the use of any content made available via our products, services, or various resources such as email, blog posts, etc.",
                                "Our Company Products are available to any user with access to the Internet. However, we are not responsible for the charges incurred for the usage of hardware, software, or internet services provider fee. Also, the user is fully responsible for the proper functioning of computer hardware and internet access.",
                                "You will be required to use login credentials for some of the sections on the Website and the Company reserves the right to block access to our services for any user who does not follow these conditions.",
                                "We undertake commercially reasonable efforts to ensure that users get uninterrupted access to our service, but cannot guarantee said access."
                            ].map((text, index) => (
                                <div key={`general-${index}`} className="flex items-start gap-3 p-4 rounded-md bg-blue-50 border border-blue-200">
                                    <HiInformationCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700">{text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Usage Guidelines */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-red-700 border-b pb-2">Website Usage Guidelines</h2>
                            {[
                                "Do not insult, abuse, harass, stalk, threaten, or infringe the rights of others.",
                                "Do not publish, post, distribute or disseminate any defamatory, infringing, indecent, offensive or unlawful material or information.",
                                "Do not upload, install, transfer files which are protected by Intellectual Property Laws or software which affects other computers.",
                                "Do not edit our HTML source code, reverse engineer or attempt to hack our Company Products.",
                                "Do not run Spam services/scripts or anything which could affect the infrastructure, and in turn, the users.",
                                "Do not communicate spam, advertise, or sell services such as digital downloads, eBooks, or phishing attempts."
                            ].map((text, index) => (
                                <div key={`usage-${index}`} className="flex items-start gap-3 p-4 rounded-md bg-red-50 border border-red-200">
                                    <HiExclamationCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                                    <p className="text-gray-700">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-md mt-2">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Term and Termination</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right to block your access to the Content and Courseware with immediate effect as a result of your misrepresentation, default, misconduct, or breach of your obligations under this Agreement (“Event of Default”).
                            On the occurrence of any Event of Default, we shall be authorized to exercise all the rights and remedies under this Agreement or applicable Law or available in equity to seek indemnification for any Loss or Claim resulting from any such Event of Default.
                        </p>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Entire Agreement</h2>
                        <p className="text-gray-600 leading-relaxed">
                            This Agreement, along with the{' '}
                            <a href="/privacy&policy" className="text-blue-500 hover:underline">
                                Privacy Policy
                            </a>,{' '}
                            <a href="/refund-policy" className="text-blue-500 hover:underline">
                                Refund Policy
                            </a>, and any additional guidelines, rules, and/or disclaimers posted on the Website constitutes the entire agreement governing your use of our website and supersedes any prior agreements, if any, relating to any matter dealt within this Agreement.
                        </p>
                    </div>
                </div>
            </div>
        </Userlayout>
    );
};

export default TermCondition;
