dataset=$1
image_path=$2
sample_name=$3

final_path=../samples/$dataset/$sample_name

mkdir -p $final_path && cp ../datasets/$dataset/$image_path $final_path
