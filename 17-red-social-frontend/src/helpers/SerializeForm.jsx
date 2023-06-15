export const serializeForm = (form) => {
  const formData = new FormData(form);

  const completeObj = {};

  for (let [name, value] of formData) {
    completeObj[name] = value;
  }
  // Object.keys(formData) => ["name", "lastName", "email"]
  // { "name": "Michael", "lastName": "Jordan"}
    //   const completeObj2 = Object.keys(formData).filter(k => k !== "lastName").reduce((objetoPrevio, currKey) => {
    //     return {
    //         ...objetoPrevio,
    //         currKey: formData[currKey]
    //       }
    //   }, {});
    //   console.log(completeObj2)

  return completeObj;
};
