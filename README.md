### Deploying 

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