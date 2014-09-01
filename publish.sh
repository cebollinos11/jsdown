read -p "Enter commit text:  " yn;
echo $yn;
git init;
git add .;
git commit -m "$yn"
git push origin master
echo "Uploading to pablosan";
scp -r ./ pablosan.com@ssh.pablosan.com:/www/jsdown  