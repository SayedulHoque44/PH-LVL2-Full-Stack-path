import axios from "axios";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import ApiError from "../../Errors/ApiError";
import httpStatus from "http-status";
import { IPaymentData } from "./ssl.interface";

const initPayment = async (paymentData: IPaymentData) => {
  try {
    const data = {
      store_id: config.ssl.storeId,
      store_passwd: config.ssl.storePass,
      total_amount: paymentData?.amount,
      currency: "BDT",
      tran_id: paymentData.transactionId, // use unique tran_id for each api call //we created in payment row
      success_url: config.ssl.successUrl,
      fail_url: config.ssl.failUrl,
      cancel_url: config.ssl.cancelUrl,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "N/A",
      product_name: "Appointment.",
      product_category: "Services",
      product_profile: "general",
      cus_name: paymentData?.name,
      cus_email: paymentData?.email,
      cus_add1: paymentData?.address,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: paymentData.phoneNumber,
      cus_fax: "01711111111",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const res = await axios({
      method: "POST",
      url: config.ssl.sslPaymentApi, //from gmail:Session API to generate transaction
      data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return res.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment Error Occured!");
  }
};

const validatePayment = async (payload: any) => {
  try {
    const Response = await axios({
      method: "GET",
      url: `${config.ssl.sslValidationApi}?val_id=${payload.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`,
    });

    return Response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment validation failed!");
  }
};
export const sslService = {
  initPayment,
  validatePayment,
};
