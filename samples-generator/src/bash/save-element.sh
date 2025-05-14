dataset=$1
image_name=$2
sample_name=$3

final_path=../samples/$dataset/$sample_name

mkdir -p $final_path && cp ../datasets/$dataset/images/$image_name $final_path
