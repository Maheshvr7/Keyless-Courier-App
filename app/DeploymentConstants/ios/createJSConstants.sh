echo "Creating JavaScript constants file for deployment target specific assets"

envFile="../app/DeploymentConstants/$1"
javascriptFile="../app/TargetConfig.js"

#write the starting line to JavaScript file
echo "export const TargetConfig = { \n" > $javascriptFile


#read each line from .env file , process it and write to JavaScript file
while read line; do
    if ! [ -z "$line" ];then

        # set the nocasematch shell option for case insensitive matching.
        shopt -s nocasematch 
        
        #replace first occurrence of '=' with ':' and append 'require' if string has an extension. 
        if [[ "${line}" =~ ".png"|".jpg"|".json"|".jpeg" ]]; then
            echo "${line/=/$': require('}),">>$javascriptFile        
        else
            echo "${line/=/$': '},">>$javascriptFile
        fi
    fi
done < $envFile


# Shell scripts expect last line to be empty,EOF. So read operation will omit last line. We have to do the previous same operation for the last line seprately
if ! [ -z "$line" ];then
    if [[ "$line" =~ ".png"|".jpg"|".js"|".json"|"jpeg" ]]; then
    echo "${line/=/$': require('}),">>$javascriptFile
    else
        echo "${line/=/$': '},">>$javascriptFile
    fi
fi

# Write closing brace at the end to JavaScript file
echo "\n}">>$javascriptFile
