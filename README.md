## Toptour API

This API is used in the Toptour client, also handling authentication and authorization.

It is reliant on two backend data services
- toptour-search
- toptour-db




### Deployment
Deployment happens through the master branch, using Travis CI's script section.

I.e: A new commit to master branch on GitHub will trigger a Travis CI build, and if successful, also deployment of that build onto the app server.

### Travis-CI

The Travis-CI build file can be seen in .travis.yml. It makes use of travis-encrypted variables. Supposedly it is safe to store encrypted data in the git repo, but by having this public it's of course less true. Therefore I will routinely change the SSH-keys, API-keys using the ansible-script in the provision folder.



variables:
- NODE_PORT
- ES_SERVER


ssh-keygen -t rsa -b 4096 -C 'kjartanbjorset@gmail.com', -f /

ssh-keygen -t rsa -b 4096 -C 'build@travis-ci.org' -f ./deploy_rsa


encrypt 

travis encrypt-file deploy_rsa --add
ssh-copy-id -i deploy_rsa.pub <ssh-user>@<deploy-host>
rm -f deploy_rsa deploy_rsa.pub
git add deploy_rsa.enc .travis.yml


rsync -e "ssh  -i keypath"
 rsync -av -r -e "ssh -i /home/kjartan/.ssh/deploy_rsa" ./dist/ travis@www.kartan.no:/var/www/www.toptour.no/


 rsync -rav --no-perms -e  "ssh -i /home/kjartan/.ssh/deploy_rsa" ./dist/ travis@www.kartan.no:/var/www/www.toptour.no/