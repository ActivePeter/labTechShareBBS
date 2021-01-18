<script>
import Util from "@/assets/js/util.js";

var profileMap = {};
function getProfile(id) {
  //   console.log(profileMap);
  if (profileMap.hasOwnProperty(id)) {
    return profileMap[id];
  } else {
    profileMap[id] = "loading";
    return null;
  }
}
function setProfile(id, profile) {
  profileMap[id] = profile;
  Util.$emit("GlobalMsg_profileUpdate", id);
}
// const name = 'shenxianhui';
// const age = 24;
//  function add(a,b) {
//     return a+ b
//   }
export default {
  getProfile,
  setProfile,
  // age
};
</script>