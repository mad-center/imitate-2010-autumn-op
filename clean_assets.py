import re
import os
import sys


# convert windows path style to linux path style
def parse_path(path: str):
    if not os.path.isfile(path):
        print("file {0} is not exist".format(path))
        exit(-1)
    path = os.path.abspath(path)  # D:\Code\PycharmProjects\word-count\docs\test.md
    regex = re.compile(r"\\+")  # mean \+, in windows, path separator is \, + means 1 or more times.
    path = re.split(regex, path)  # ['D:', 'Code', 'PycharmProjects', 'word-count', 'docs', 'test.md']
    path = '/'.join(path)  # D:/Code/PycharmProjects/word-count/docs/test.md
    index = path.rfind("/")
    dir_name = path[0:index + 1]  # D:/Code/PycharmProjects/word-count/docs/
    file_name = path[index + 1:]  # test.md
    return dir_name, file_name


def get_used_markdown_pic(md_path: str):
    dirname, filename = parse_path(md_path)
    set_pic = set()

    with open(md_path, "r", encoding="utf-8") as f:
        s = f.readlines()
        s = "".join(s)
        # .*? 匹配符号内的所有字符
        # https://blog.csdn.net/m0_37696990/article/details/105925940 markdown内容提取

        # input: ![image-20220119193327004](assets/image-20220119193327004.png)
        # => [assets/image-20220119193327004.png,...]
        results_img = re.findall(r'!\[.*?]\((.*?)\)', s)

        # input: <img src="assets/image-20220120134825302.png" alt="image-20220120134825302"  />
        #  =>  [src="assets/image-20220120134825302.png" alt="image-20220120134825302",...]
        results_src = re.findall(r'<img\s*(.*?)\s*/>', s)

        for result in results_img:
            if os.path.exists(os.path.join(dirname, result)):
                set_pic.add(result.split("/")[-1])
        for result in results_src:
            result = result.split("alt")[0].strip().split("=")[-1].strip().strip('"')
            # => assets/image-20220120134825302.png
            if os.path.exists(os.path.join(dirname, result)):
                set_pic.add(result.split("/")[-1])

        if len(set_pic) == 0:
            return set()

        return set_pic


def get_img_assets(doc_folder="docs/", asset_folder="assets"):
    asset_path = doc_folder + asset_folder
    set_assets = set()

    dirs = os.listdir(asset_path)
    for i in dirs:
        set_assets.add(i)

    return set_assets


def get_md_files(path, dict):
    files = os.listdir(path)
    for file in files:
        try:
            file_path = os.path.join(path, file)  # here is relative path
            if os.path.isdir(file_path):
                # recurse_path(file_path, dict)
                pass
            else:
                if os.path.splitext(file_path)[1] == '.md':
                    abs_path = os.path.dirname(os.path.realpath(file_path))  # convert to absolute path
                    dict[file] = abs_path
        except:
            continue


# API:
# - doc_folder like 'docs/'
# - assets folder like 'assets' under doc_folder, means 'docs/assets/'
if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("usage: python clean_assets.py docs/")
        exit(-1)
    doc_folder = sys.argv[1]

    img_assets = get_img_assets(doc_folder, asset_folder="assets")
    print('img_assets: ', len(img_assets))

    md_dict = {}
    get_md_files(doc_folder, md_dict)
    # print(md_dict)

    img_in_use = set()
    for key in md_dict.keys():
        resolve_path = os.path.join(doc_folder, key)
        pic = get_used_markdown_pic(resolve_path)
        print(key, len(pic))

        for item in pic:
            img_in_use.add(item)

    print('img_in_use: ', len(img_in_use))

    img_can_delete = img_assets - img_in_use
    print('img_can_delete: ', len(img_can_delete))

    # add dry-run mode, let user can preview which images will be deleted.
    for i in img_can_delete:
        can_delete = os.path.join(doc_folder, "assets/", i)
        print('removing...', can_delete)
        os.remove(can_delete)
