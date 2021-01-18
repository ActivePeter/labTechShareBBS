import { request, request_auth_required } from "@/network/request";

export function getUsersMultiData() {
  return request({
    url: "/api/users/"
  });
}

export function Login(data) {
  return request({
    method: "post",
    url: "/api/login/",
    data
  });
}

export function Register(data) {
  return request({
    method: "post",
    url: "/api/register/",
    data
  });
}

export function GetCode(data) {
  return request(
    {
      method: "post",
      url: "/api/emailcodes/",
      data
    },
    60000
  );
}

export function GetSms(data) {
  return request({
    method: "get",
    url: "/api/sms/",
    data
  });
}

export function LoadPersonInfo(id) {
  return request({
    method: "get",
    url: "/api/users/simple/" + id + "/"
  }).then(res => {
    // console.log("LoadPersonInfo");
    // console.log(res);
    var result = {};
    switch (res.status) {
      case 200:
        result.status = 200;
        result.data = res.data;
        break;
      case 404:
        result.status = 404;
        result.data = res.data;
        break;
    }
    return result;
  });
}

export function LoadPersonDetail(id) {
  return request_auth_required({
    method: "get",
    url: "/api/users/detail/",
  }).then(res => {
    // console.log("LoadPersonDetail");
    // console.log(res);
    // var result={};
    // switch(res.status){
    //   case 200:
    //     result.status=200;
    //     result.data=res.data.results;
    //     break;
    //   case 404:
    //     result.status=404;
    //     result.data=res.data;
    //     break;
    // }
    return res;
  });
}
export function UpdatePersonInfo(data) {
  console.log("UpdatePersonInfo");
  console.log(data);
  return request_auth_required({
    method: "put",
    url: "/api/users/detail/",
    data
  }).then(res => {
    console.log("UpdatePersonInfo_back");
    console.log(res);
    // var result={};
    // switch(res.status){
    //   case 200:
    //     result.status=200;
    //     result.data=res.data.results;
    //     break;
    //   case 404:
    //     result.status=404;
    //     result.data=res.data;
    //     break;
    // }
    return res;
  });
}

