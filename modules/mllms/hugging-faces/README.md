# Langchain app

This application will take the samples and pass them to the mllms under test, then the results will be stored somewhere to be analyzed as correct or incorrect.  


sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.11 python3.11-venv

wget https://bootstrap.pypa.io/get-pip.py
python3.11 get-pip.py
python3.11 -m pip install --upgrade pip

Setup of a clean venv:  

python3.11 -m venv venv
source venv/bin/activate

Install huggingfaces libraries  
`pip install transformers diffusers`

Install gpu libraries  
`pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118`
