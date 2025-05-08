image_name=$1
sample_number=$2
dataset=$3

final_path=stratified-sample/$sample_number/$dataset

mkdir -p $final_path && cp datasets/$dataset/images/$image_name $final_path
