# webtasks
Web tasks (serverless or FaaS) as per https://webtask.io/

### Fastest way to get going 
Run the cli as per: https://webtask.io/cli

`$ npm install wt-cli -g`  
`$ wt init <your-email@somedomain.com>`  
> Please enter the verification code we sent to <i>your-email@somedomain.com</i> below.  
> Verification code: `<12345678>`  
> Welcome to webtasks! Create your first one as follows:  
>  
> $ echo "module.exports = function (cb) { cb(null, 'Hello'); }" > hello.js  
> $ wt create hello.js  
  
`$ wt create webtasks-sample2.js`  
> Webtask created  
>  
> You can access your webtask at the following url:  
> https://wt-695374f7aa09f48c840680b953b0ce8e-0.run.webtask.io/webtask-sample2  `

That's it!  

Cheers,  
#b
