# 🚀 Welcome to the Azion Edge Computing and Upstash Redis template!

## Overview

In this example you will be able to insert and request data in the Upstash Redis database.

This template uses Action [edge-computing-deploy](https://github.com/marketplace/actions/edge-computing-deploy) to deploy.


---

# In just a few steps you can try it out:

## **1. Clone Repository**

Clone this repository or Click "use template".

*Please check the [./azion/azion.json](./azion/azion.json) file and update your project name if you wish.*
*If you created this repository through Azion Marketplace, the name will be updated according to your choice.*


## **2. Create Azion RTM Account**

[Welcome to the Edge](https://manager.azion.com/signup/)

## **3. Create Azion Personal token and add in github secrets**

Create [Personal Token](https://manager.azion.com/iam/personal-tokens)

Add https://github.com/<<username>>/<<projectname>>/settings/secrets/actions

Secret Azion:
```bash
AZION_PERSONAL_TOKEN=<my personal token>
```

Adding the secrets ![Add Secret](./docs/images/secrets.png)


## **4. Actions permissions**

**Important

Please enable permissions for the action to automate the update of the azion.json file.
[Config Actions](https://github.com/jcbsfilho/azion-sample-application/settings/actions)


https://docs.github.com/en/actions/security-guides/automatic-token-authentication#modifying-the-permissions-for-the-github_token


## **5. Create Upstash Account and Add in github secrets**

Create a Redis database, copy the url and token as per the image below.

Get Token Upstash ![Upstash Token](./docs/images/upstash_token.png)

*'https://github.com/<"username">/<"projectname">/settings/secrets/actions'*

Secrets Upstash:
```bash
UPSTASH_REDIS_REST_URL=<>
UPSTASH_REDIS_REST_TOKEN=<>
```

Adding the secrets ![Add Secret](./docs/images/secrets.png)


## **6. Create the Pull Request for automatic deployment**

Create the develop branch, make a change and then create the Pull Request for the main branch.

```bash

git checkout -b develop

```

Change Here!!!

```js

const name = 'your name' // change here you name

```

Commit change and push!

```bash

git add README.md
git commit -m "feat: test update to deploy"
git push --set-upstream origin develop

```

Create a pull request to the main branch to automatically deploy.

How create [Create Pull Request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

## **7. Automated config**

In the Actions file (workflows) [main.yml](.github/workflows/main.yml) the step of automating changes in the first build.

The build Action performs a change the first time in the [./azion/azion.json](./azion/azion.json) file, updating the resource id's.

*Change may be required if your main branch is protected*


## **8. Enable feature Application Acceleration**

If your deploy is successful!!! 

Enter the Edge Application menu on your RTM, look for your sample application and in Main Settings activate the Application Acceleration.

*Enable Application Acceleration to this site to use advanced rules engine, advanced cache key, bypass cache, forward cookies or support to proxy methods (post/put/patch/delete).*

![Application Acceleration](./docs/images/azion_acceleration.png)

***Please check the function arguments in the instance.***


## **9. Make Requests**

**Redis set item**

```bash

curl --location -g --request POST 'https://{{DOMAIN}}/' \
--header 'Accept: application/json' \
--data-raw '{
    "key": "my_unique_id",
    "value": "{\"name\":\"My name\",\"mail\":\"user@test.com\"}",
    "ex": 60
}'

```

**Redis get item**

```bash

curl --location -g --request GET 'https://{{DOMAIN}}?search=my_unique_id' \
--header 'Accept: application/json'

```

