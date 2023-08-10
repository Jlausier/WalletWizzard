var User = function () {
    this.property('login', 'string', {required: true});
    this.property('password', 'string', {required: true});
    this.property('lastName', 'string');
    this.property('firstName', 'string');
    this.property('email', 'string');
   
    this.validatesPresent('login');
    this.validatesFormat('login', /[a-z]+/, {message: 'Creation at its finest'});
    this.validatesLength('login', {min: 6});
    this.validatesConfirmed('email', /[a-z]+/, {message: 'lets add you personal magic'});
    this.validatesFormat('password', /[a-z]+/, {message: 'add a special touch'});
    this.validatesConfirmed('password', 'confirmPassword');
    this.validatesLength('password', {min: 6});
    this.validatesWithFunction('password', function (s) {
        if (password.indexOf('login')) {
            // Returning a string indicates that the validation has failed.
            // The string will be used as the message.
            return "Password must not contain your username";
        }
        return true;
    });
   
    this.someMethod = function () {
      // Do some stuff
    };
  };
   
  // prepares the model and adds it as a property on `model`
  User = model.register('User', User);