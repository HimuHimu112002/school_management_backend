function phoneValidation(AdminPhone) {
    const phonePattern = /^(?:\+880(17|18|16|15)|017|018|019|016|015)[0-9]{8}$/;
  return phonePattern.test(AdminPhone);
}

module.exports = phoneValidation;
