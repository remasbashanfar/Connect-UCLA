#!/usr/local/cs/bin/python3
import os
import os.path
import sys
import zlib

# Returns .git directory, or None if can't be found
def find_git():
# current dir of python file is located (do this, as current working dir
# could be different).
    os.listdir()
    cur_dir = os.path.dirname(os.path.realpath(__file__))
    while True:
        file_list = os.listdir(cur_dir) # get all files in directory
        parent_dir = os.path.dirname(cur_dir) # get parent dir
        if '.git' in file_list:
            # print(cur_dir, file = sys.stdout)
            return os.path.join(cur_dir, '.git')
        else:
            if cur_dir == parent_dir: # this means we are at root dir (done)
                sys.exit("Not inside a Git repository")
                return None
            else:
                cur_dir = parent_dir

def uncompress_file(file_path):
    with open(file_path, 'rb') as file:
        data = file.read()
        return zlib.decompress(data).decode('utf-8')

def printBranches():
    branches_paths = find_git() + '/refs/heads'
    print(os.listdir(branches_paths))

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

    def __repr__(self):
        return self.data

class CommitNode:
    def __init__(self, commit_hash):
        """
        :type commit_hash: str
        """
        self.commit_hash = commit_hash
        self.parents = set()
        self.children = set()
    
    def addEdge(self, data):
        new_node = node(data)
    
    def addFirstBranch(self, node):
        node.next = self.head
        self.head = node

    def addEnd(self, node):
        if self.head is None:
            self.head = node
            return
        for current_node in self:
            pass
        current_node.next = node
# def get_head():
#     git_head = '.git\\HEAD'
#     with open(git_head, 'r') as git_head_file:
#         git_head_data = str(git_head_file.read())
#     git_head_ref = '.git\\%s' % git_head_data.split(' ')[1].replace('/', '\\').strip()
#     with open(git_head_ref, 'r') as git_head_ref_file:
#         commit_id = git_head_ref_file.read().strip()[:7]
#         print(commit_id)

    # def deleteEdge():
        #not needed as of now
    # def sort():

    # def find_parent_commit(self, commit_hash):
# def find_parent():
    #decompress
def get_hash(path):
    branch_hash = open(path, 'r').read()
    return branch_hash

def get_branches():
    path = find_git() + "/refs/heads/"
    branches = (os.listdir(path))
    i = 0
    branch_head_hashes = []
    for branch in branches: 
        branch_head_hashes.append(get_hash(path+branch))
        i+=1
    print(*branch_head_hashes)

# def get_parent(commit_hash):
#     catcommand= "git cat-file -p " + commit_hash
#     # commitstring = os.system(catcommand)
#     # print(commitstring )
#     parent_counter=0
#     extract_hash=""
#     str_commitstring= str( os.system(catcommand))
#     print(str_commitstring)
#     # for i in (str_commitstring):
#     #     if i=='p' and i+1=='a' and i+2=='r' and i+3=='e' and i+4 =='n' and i+5 =='t':
#     #         extract_hash= str_commitstring[i+6:i+47] 
#     #     if("parent" in str_commitstring):
#     #         parent_counter=parent_counter+1
#     # index= str_commitstring.index('parent')
#     # print("index")
#     # print(index)
#     # extract_hash= str_commitstring[index+6, index+47]
#     # print("HASH")
#     # print ( extract_hash)

def get_parent_nonlazy_method(commit_hash):
    firstTwoChars = commit_hash[0:2]
    restofChars= commit_hash[2:]
    path= ".git/objects/"+ firstTwoChars + "/" + restofChars
    read = open(path, 'r').read()
    return read

def main():
    get_parent_nonlazy_method("4eeed82d0b175b809fb991ae2c2bfb43e1b238bb")


if __name__ == "__main__":
    main()