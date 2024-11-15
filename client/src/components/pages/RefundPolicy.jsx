import React from 'react'
import Userlayout from '../layout/Userlayout'

const RefundPolicy = () => {
    return (
        <Userlayout>
            <div className="max-w-4xl my-5 mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-green-800 text-center">Refund and Cancellation Policy</h1>
                <p className="mb-4 text-gray-700">
                    Our focus is complete customer satisfaction. In the event, if you are displeased with the services
                    provided, we will refund back the money, provided the reasons are genuine and proved after investigation.
                    Please read the fine prints of each deal before buying it, it provides all the details about the services
                    or the product you purchase.
                </p>
                <p className="mb-4 text-gray-700">
                    In case of dissatisfaction from our services, clients have the liberty to cancel their projects and request
                    a refund from us. Our Policy for the cancellation and refund will be as follows:
                </p>

                <h2 className="text-xl font-semibold text-green-800 mt-6">Cancellation Policy</h2>
                <p className="mb-4 text-gray-700">
                    For cancellations please contact us via <a href="/contact" className="text-green-600 underline">contact us link</a>.
                    Requests received later than 7 business days prior to the end of the current service period will be treated
                    as cancellation of services for the next service period.
                </p>

                <h2 className="text-xl font-semibold text-green-800 mt-6">Refund Policy</h2>
                <p className="mb-4 text-gray-700">
                    We will try our best to create the suitable design concepts for our clients.
                </p>
                <p className="mb-4 text-gray-700">
                    In case any client is not completely satisfied with our products we can provide a refund.
                </p>
                <p className="mb-4 text-gray-700">
                    If paid by credit card, refunds will be issued to the original credit card provided at the time of
                    purchase and in case of payment gateway name payments refund will be made to the same account.
                </p>
            </div>
        </Userlayout>
    )
}

export default RefundPolicy