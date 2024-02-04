### Register API. 

Endpoint: http://localhost:4000/api/users/register

Body:

     {
        username: jhon,
        email: jhon@gmail.com,
        password: jhon123,
        repeate_password: jhon123
     } 
  
message_succes:

    {
        message: 'ok'
    }
    
message_failed:

    {
        code: 400,
        message: 'bad request',
        errors: 'username must be length 10'
    }
    

validation: 

username: 
-  minimal panjang karakter 5
-  required
-  not empty
-  harus alfanumeric
-  max panjang karakter 20
-  tidak boleh ada symbols

email:
-  harus email yang valid
-  required

password:
-  harus ada alfanumeric
-  tidak boleh ada symbols
-  min length harus 8 karakter

repeate_password:
-  harus sama persis dengan password


### Login API

Endpoint: http://localhost:4000/api/users/login


body:

      {
         email: john@gmail.com,
         password: john123 
      }
     

message_succes:

      {
          accessToken: token key
      }
      
message_failed:
  
      {
          code: 404,
          errors: 'email tidak ditemukan atau password salah'
      }

validation:

email: 
-  harus email yang valid
-  required
-  jangan ada symbol

password:
-  required
-  jangan ada symbol


### Logout api 

Endpoint: http://localhost:4000/api/users/logout

message_succes: 

    {
        code 200
    }

message_failed:

    {
        code: 401,
        errors: 'unauthorized
    }


validation:

- jika users sudah logout, maka tidak boleh logout lagi
- jika users belum login atau register, maka tidak boleh login

