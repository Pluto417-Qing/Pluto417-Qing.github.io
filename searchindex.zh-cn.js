var relearn_searchindex = [
  {
    "breadcrumb": "Hello World \u003e \rPosts",
    "content": "Lab 1：Unix Utilities Lab 2: System Calls Lab 3：Page Tables Lab 4: Traps",
    "description": "完成6.s081 xv6实验过程中写的实验文档",
    "tags": [],
    "title": "6.s081 xv6 Lab",
    "uri": "/posts/lab/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \rPosts \u003e \r6.s081 xv6 Lab",
    "content": "Lab1 主要关于如何使用操作系统像用户程序提供的API来编写程序，也就是所谓的系统调用。使用系统调用可以方便使用操作系统封装的很多功能。完成实验之前，先了解一些预备知识。\n预备知识 1. 如何获取命令行参数 int main(int argc, char *argv[]){}\rmain函数有两个参数。参数argc是一个整数，储存传入的命令行参数的个数。而参数argv是一个字符串数组，以字符串的形式存储传入的参数。argv[0]处存的是命令名称，往后才是参数。\n2. 系统调用的底层实现细节 系统调用是如何实现的，比如为什么可以在sleep.c中直接使用sleep函数，那么sleep函数后面的实现细节是什么？我们可以通过gdb来观察一下。\n首先读入user/sleep.c文件，并在sleep的main函数处设置断点。按c运行到main函数入口处停下。 进入sleep函数查看 发现进入了usys.S文件，注意高亮处到ret前的两条指令。 li a7, SYS_sleep ecall\r在kernel/syscall.h文件中查看SYS_sleep的值为13，所以这两条语句的作用是把要调用的系统调用函数的编号作为参数传入a7寄存器，然后执行ecall指令，该指令将处理器模式切换为内核模式（在用户模式下是不能调用系统调用函数的）。\n继续运行，发现到达kernel/syscall函数内部，此时num的值为13，可以发现该函数通过syscalls函数数组根据传入的编号调用对应的系统调用函数。 继续运行，最终来到sleep系统调用的本体，sys_sleep函数，该函数位于kernel/sysproc.c文件内，该文件里是常用的系统调用函数，例如fork,exit等. Sleep(easy) 题目要求：\nImplement the UNIX program sleep for xv6; your sleep should pause for a user-specified number of ticks. A tick is a notion of time defined by the xv6 kernel, namely the time between two interrupts from the timer chip. Your solution should be in the file user/sleep.c.\r直接调用sleep库函数即可。用户模式可调用的函数接口定义在user/user.h，系统调用的具体细节见上文。\r#include \"kernel/types.h\" #include \"kernel/stat.h\" #include \"user/user.h\" int main(int argc, char* argv[]){ if(argc \u003c 2){ // 如果没有给命令参数，打印错误信息 fprintf(2,\"Usage: sleep num\\n\"); exit(1); } int time = atoi(argv[1]); // 将命令参数转换为整数 sleep(time); // 调用sleep函数，等待指定时间 exit(0); }\rPingpong(easy) 题目要求：\nWrite a program that uses UNIX system calls to ''ping-pong'' a byte between two processes over a pair of pipes, one for each direction. The parent should send a byte to the child; the child should print \"\u003cpid\u003e: received ping\", where \u003cpid\u003e is its process ID, write the byte on the pipe to the parent, and exit; the parent should read the byte from the child, print \"\u003cpid\u003e: received pong\", and exit. Your solution should be in the file user/pingpong.c.\r看题知父进程和子进程都要往管道里写数据，也要从管道里读数据。所以需要创建两对管道，为什么？因为一个进程只能使用一对管道的一端用来读或者写，不用的那一端要及时关闭。如果不关闭就会导致read或者write阻塞，一直无法结束，这也是为什么需要创建两对管道的原因。\n同时，需要注意的是，fork后子进程会复制得到父进程的管道，所以fork以后子进程有两对管道，父进程也有两对管道。而它们分别只用到各自的4个管道中的两个分别作为读写端。所以一开始关闭不用的那一端，另一端的管道才能被父进程或者子进程使用。\n#include \"kernel/types.h\" #include \"kernel/stat.h\" #include \"user/user.h\" int main() { // 创建两个管道，一个父进程向子进程发送消息，另一个相反 int p1[2]; int p2[2]; pipe(p1); pipe(p2); char buf[1];\t// 缓冲区，用于存储发送的消息 char* b = \"c\"; int pid = fork();\t// 创建一个子进程 if(pid == 0){ close(p2[0]);\t// 关闭子进程的读取管道 close(p1[1]);\t// 关闭子进程的写入管道 read(p1[0],buf,1);\t// 从父进程读取消息 printf(\"%d: received ping\\n\",getpid()); write(p2[1],buf,1);\t// 向父进程写入消息 close(p1[0]);\t// 关闭子进程的读取管道 close(p2[1]);\t// 关闭子进程的写入管道 exit(0); } else if(pid \u003e 0){ close(p2[1]); // 关闭父进程的写入管道 close(p1[0]); // 关闭父进程的读取管道 write(p1[1],b,1);\t// 向子进程写入消息 read(p2[0],buf,1);\t// 从子进程读取消息 printf(\"%d: received pong\\n\",getpid()); close(p2[0]);\t// 关闭父进程的读取管道 close(p1[1]);\t// 关闭父进程的写入管道 } exit(0); }\rprimes (moderate)/(hard) 题目要求：\nWrite a concurrent version of prime sieve using pipes. This idea is due to Doug McIlroy, inventor of Unix pipes. The picture halfway down this page and the surrounding text explain how to do it. Your solution should be in the file user/primes.c.\r题目有几个要点：\r是管道资源有限的问题，必须及时关闭不用的管道\n递归调用筛选素数的函数\n父进程负责筛选素数，子进程负责打印素数\n递归调用的筛选素数的函数主要思路是：参数为父进程的管道，该函数从该管道读取父进程写入的数，打印并保存第一个数，然后再创建一个新的管道，并创建子进程，继续从旧管道读取数，把第一个数的倍数筛掉后的数写入到新的管道。然后递归调用该函数，直到管道中没有数据。\n#include \"kernel/types.h\" #include \"kernel/stat.h\" #include \"user/user.h\" void primes(int oldPipe[]); int main(){ int p[2],i; pipe(p); int pid = fork(); if(pid == 0){ primes(p); // 递归处理素数筛选 exit(0); } else if(pid \u003e 0){ for(i = 2; i \u003c= 35; i++){ write(p[1], \u0026i, sizeof(int)); // 向管道写入数字2-35 } i = 0; write(p[1], \u0026i, sizeof(int)); // 向管道写入0，表示结束 close(p[1]); // 及时关闭管道 wait(0); } else { printf(\"fork error\\n\"); } exit(0); } void primes(int oldPipe[]){ close(oldPipe[1]); // 不再使用的管道一定要及时关掉，不然会导致运行失败 int p; read(oldPipe[0], \u0026p, sizeof(int)); // 从管道读取数字 if (!p){ // 如果读取到0，表示没有数字了，结束进程 exit(0); } printf(\"prime %d\\n\",p); // 打印当前素数 //创建该进程与子进程的pipe int newPipe[2]; pipe(newPipe); int pid = fork(); if(pid == 0){ // 子进程 primes(newPipe); // 递归处理素数筛选 exit(0); } else if(pid \u003e 0){ close(newPipe[0]); int i,num; while(read(oldPipe[0],\u0026num,sizeof(int))){ // 如果num能被p整除，则写入新的管道 if(num % p){ write(newPipe[1], \u0026num, sizeof(int)); } } i = 0; write(newPipe[1], \u0026i, sizeof(int)); // 向新的管道写入0，表示结束 // 及时关闭管道 close(oldPipe[0]); // 关闭旧的管道 close(newPipe[1]); // 关闭新的管道 wait(0); } else { printf(\"fork error\\n\"); } exit(0); }\rfind (moderate) 题目要求：\nWrite a simple version of the UNIX find program: find all the files in a directory tree with a specific name. Your solution should be in the file user/find.c.\r首先查看user/ls.c中读取目录的方法。可知文件/目录的信息都储存在stat结构体中，通过查看其type属性的值，就可以知道是文件还是目录。。\rswitch(st.type){ case T_FILE: ... case T_DIR: ...\r回到find.c中,先打开目录,然后遍历目录中的文件,如果是文件,则比较是否和要找的文件名相同,如果相同则打印文件名。如果是目录,则递归调用find函数进入目录内查找。\n#include \"kernel/types.h\" #include \"kernel/stat.h\" #include \"user/user.h\" #include \"kernel/fs.h\" void find(char *target, char *env); char* fmtname(char *path); int main(int argc, char *argv[]){ if(argc \u003c 2){ // 如果没有输入参数，则输出错误信息 fprintf(2, \"Usage: find env target\\n\"); exit(0); } find(argv[2], argv[1]); exit(0); } void find(char *target, char *env){ char buf[512], *p; struct stat st; // 用于存储文件状态 struct dirent de; // 用于存储目录项 int fd; // 用于存储文件描述符 if((fd = open(env, 0)) \u003c 0){ // 如果打开文件失败，则输出错误信息 fprintf(2, \"find: cannot open %s\\n\", env); return; } if(fstat(fd, \u0026st) \u003c 0){ // 如果获取文件状态失败，则输出错误信息 fprintf(2, \"find: cannot stat %s\\n\", env); return; } switch(st.type){ case T_FILE: // 如果文件类型为文件，则比较文件名 if(strcmp(fmtname(env), target) == 0){ printf(\"%s\\n\",env); } break; case T_DIR: // 如果文件类型为目录，则复制目录路径 strcpy(buf, env); p = buf + strlen(buf); // 将p指向buf的末尾 *p++ = '/'; // 在buf的末尾添加一个'/' while(read(fd, \u0026de, sizeof(de)) == sizeof(de)){ // 如果目录项为空，则跳过 if(de.inum == 0){ continue; } memmove(p, de.name, DIRSIZ); p[DIRSIZ] = 0; if(strcmp(de.name, \".\") != 0 \u0026\u0026 strcmp(de.name, \"..\") != 0) // 如果目录项不是当前目录和父目录，则递归查找 find(target, buf); } break; } close(fd); } char* fmtname(char *path) { static char buf[DIRSIZ+1]; char *p; // Find first character after last slash. for(p=path+strlen(path); p \u003e= path \u0026\u0026 *p != '/'; p--) ; p++; // Return blank-padded name. if(strlen(p) \u003e= DIRSIZ) return p; memmove(buf, p, strlen(p)); memset(buf+strlen(p), '\\0', DIRSIZ-strlen(p)); return buf; }\rxargs (moderate) 题目要求：\nWrite a simple version of the UNIX xargs program: read lines from the standard input and run a command for each line, supplying the line as arguments to the command. Your solution should be in the file user/xargs.c.\r为什么要使用xargs,因为有些命令行工具比如rm，它只能通过命令行参数接收文件名（如 rm file1 file2），而不能从管道（|）读取输入。所以这时就需要使用xargs来转换。\rxargs命令的实现思路:\n主函数main接收命令行参数:\n检查参数数量,至少需要一个命令参数 将命令行参数复制到新数组newArgv中,为后续添加标准输入内容预留空间 xargs函数实现核心功能:\n从标准输入读取内容,按行处理\n每读取一行完整内容后:\na. fork一个子进程\nb. 在子进程中:\n将读取的行内容作为最后一个参数 执行目标命令 c. 父进程等待子进程结束,继续处理下一行\n通过这种方式,实现了将标准输入的每一行作为参数执行命令\n#include \"kernel/types.h\" #include \"kernel/stat.h\" #include \"user/user.h\" #include \"kernel/fs.h\" #include \"kernel/param.h\" void xargs(char *cmd, int argc, char *argv[]); int main(int argc, char *argv[]){ if(argc \u003c 2){ // 如果没有输入参数，则输出错误信息 fprintf(2, \"Usage: xargs cmd [arg]\\n\"); exit(0); } char *newArgv[argc + 1]; int i; for(i = 0; i \u003c argc - 1; i++){ // 将命令行参数复制到newArgv中 newArgv[i] = argv[i+1]; } xargs(argv[1], argc, newArgv); // 调用xargs函数 exit(0); } void xargs(char *cmd, int argc, char *argv[]){ char buf[MAXARG]; int n = 0; while(read(0,\u0026buf[n],sizeof(char))){ if(buf[n] != '\\n'){ // 如果buf[n]不是换行符，则继续读取 n++; continue; } buf[n] = '\\0'; int pid = fork(); if(pid == 0){ argv[argc - 1] = buf; // 将buf作为最后一个参数 argv[argc] = 0; // 将argv[argc]设置为0 exec(cmd,argv); // 执行命令 fprintf(2,\"execv error\\n\"); // 如果exec失败，则输出错误信息 } else { wait(0); n = 0; continue; exit(0); } } }\r测评记录",
    "description": "Lab1 主要关于如何使用操作系统像用户程序提供的API来编写程序，也就是所谓的系统调用。使用系统调用可以方便使用操作系统封装的很多功能。完成实验之前，先了解一些预备知识。\n预备知识 1. 如何获取命令行参数 int main(int argc, char *argv[]){}\rmain函数有两个参数。参数argc是一个整数，储存传入的命令行参数的个数。而参数argv是一个字符串数组，以字符串的形式存储传入的参数。argv[0]处存的是命令名称，往后才是参数。\n2. 系统调用的底层实现细节 系统调用是如何实现的，比如为什么可以在sleep.c中直接使用sleep函数，那么sleep函数后面的实现细节是什么？我们可以通过gdb来观察一下。\n首先读入user/sleep.c文件，并在sleep的main函数处设置断点。按c运行到main函数入口处停下。",
    "tags": [
      "实验",
      "探索"
    ],
    "title": "Lab 1：Unix Utilities",
    "uri": "/posts/lab-1unix-utilities/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \rPosts \u003e \r6.s081 xv6 Lab",
    "content": "Lab1 是关于使用系统调用，Lab2则要我们自己写系统调用。\nSystem call tracing (moderate) 题目要求：\nIn this assignment you will add a system call tracing feature that may help you when debugging later labs. You'll create a new trace system call that will control tracing. It should take one argument, an integer \"mask\", whose bits specify which system calls to trace. For example, to trace the fork system call, a program calls trace(1 \u003c\u003c SYS_fork), where SYS_fork is a syscall number from kernel/syscall.h. You have to modify the xv6 kernel to print out a line when each system call is about to return, if the system call's number is set in the mask. The line should contain the process id, the name of the system call and the return value; you don't need to print the system call arguments. The trace system call should enable tracing for the process that calls it and any children that it subsequently forks, but should not affect other processes. 由Lab1我们知道,系统调用的过程是,首先运行syscall函数,然后进入内核态,内核态运行sysproc.c中的系统调用函数. 所有我们首先需要在kernel/sysproc.c中定义一个新的系统调用函数sys_trace。在这个函数中我们会获取函数参数,然后设置proc结构体的traceMask字段。因为每个系统调用的信息都可能会被打印，而是否打印是由traceMask字段控制的。所有具体的打印代码应该放在syscall函数中,因为每个系统调用都必须经过该函数。 uint64 sys_trace(void) { int mask; if(argint(0,\u0026mask) \u003c 0){ return -1; } struct proc *p = myproc(); p -\u003e traceMask = mask; return 0; }\rSysinfo (moderate) 题目要求：\nIn this assignment you will add a system call, sysinfo, that collects information about the running system. The system call takes one argument: a pointer to a struct sysinfo (see kernel/sysinfo.h). The kernel should fill out the fields of this struct: the freemem field should be set to the number of bytes of free memory, and the nproc field should be set to the number of processes whose state is not UNUSED. We provide a test program sysinfotest; you pass this assignment if it prints \"sysinfotest: OK\". 测评记录",
    "description": "Lab1 是关于使用系统调用，Lab2则要我们自己写系统调用。\nSystem call tracing (moderate) 题目要求：\nIn this assignment you will add a system call tracing feature that may help you when debugging later labs. You'll create a new trace system call that will control tracing. It should take one argument, an integer \"mask\", whose bits specify which system calls to trace. For example, to trace the fork system call, a program calls trace(1 \u003c\u003c SYS_fork), where SYS_fork is a syscall number from kernel/syscall.h. You have to modify the xv6 kernel to print out a line when each system call is about to return, if the system call's number is set in the mask. The line should contain the process id, the name of the system call and the return value; you don't need to print the system call arguments. The trace system call should enable tracing for the process that calls it and any children that it subsequently forks, but should not affect other processes. 由Lab1我们知道,系统调用的过程是,首先运行syscall函数,然后进入内核态,内核态运行sysproc.c中的系统调用函数. 所有我们首先需要在kernel/sysproc.c中定义一个新的系统调用函数sys_trace。在这个函数中我们会获取函数参数,然后设置proc结构体的traceMask字段。因为每个系统调用的信息都可能会被打印，而是否打印是由traceMask字段控制的。所有具体的打印代码应该放在syscall函数中,因为每个系统调用都必须经过该函数。 uint64 sys_trace(void) { int mask; if(argint(0,\u0026mask) \u003c 0){ return -1; } struct proc *p = myproc(); p -\u003e traceMask = mask; return 0; }\rSysinfo (moderate) 题目要求：\nIn this assignment you will add a system call, sysinfo, that collects information about the running system. The system call takes one argument: a pointer to a struct sysinfo (see kernel/sysinfo.h). The kernel should fill out the fields of this struct: the freemem field should be set to the number of bytes of free memory, and the nproc field should be set to the number of processes whose state is not UNUSED. We provide a test program sysinfotest; you pass this assignment if it prints \"sysinfotest: OK\". 测评记录",
    "tags": [
      "实验",
      "探索"
    ],
    "title": "Lab 2: System Calls",
    "uri": "/posts/lab-2-system-calls/index.html"
  },
  {
    "breadcrumb": "Hello World",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Posts",
    "uri": "/posts/index.html"
  },
  {
    "breadcrumb": "Hello World",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签",
    "uri": "/tags/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \r标签",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签 :: 实验",
    "uri": "/tags/%E5%AE%9E%E9%AA%8C/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \r标签",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签 :: 探索",
    "uri": "/tags/%E6%8E%A2%E7%B4%A2/index.html"
  },
  {
    "breadcrumb": "Hello World",
    "content": "",
    "description": "",
    "tags": [],
    "title": "类别",
    "uri": "/categories/index.html"
  },
  {
    "breadcrumb": "",
    "content": "欢迎来到我的博客 看过很多技术大佬的博客，身边的同学也有搭建自己的博客分享学习生活的，终于我决定也创建一个自己的博客，想以此激励自己多总结，多表达，多写作。知识是无限的，每天也遇到很多新的内容，希望通过博客，我可以把这些内容分享给大家，一起交流与学习。当然，也想随手记录生活。\n技术心得 学习笔记 个人感悟 有趣的发现 未来的计划 走一步算一步吧，加油！\n下面是我学习的一些编程语言的Hello World程序。\nPython def hello_world(): print(\"Welcome to my blog!\") hello_world()\rJava public class HelloWorld { public static void main(String[] args) { System.out.println(\"Welcome to my blog!\"); } }\rC #include \u003cstdio.h\u003e int main() { printf(\"Welcome to my blog!\\n\"); return 0; }\rC++ #include \u003ciostream\u003e int main() { std::cout \u003c\u003c \"Welcome to my blog!\" \u003c\u003c std::endl; return 0; }\rHTML \u003c!DOCTYPE html\u003e \u003chtml\u003e \u003chead\u003e \u003ctitle\u003eWelcome to my blog!\u003c/title\u003e \u003c/head\u003e \u003cbody\u003e \u003ch1\u003eWelcome to my blog!\u003c/h1\u003e \u003c/body\u003e \u003c/html\u003e",
    "description": "欢迎来到我的博客 看过很多技术大佬的博客，身边的同学也有搭建自己的博客分享学习生活的，终于我决定也创建一个自己的博客，想以此激励自己多总结，多表达，多写作。知识是无限的，每天也遇到很多新的内容，希望通过博客，我可以把这些内容分享给大家，一起交流与学习。当然，也想随手记录生活。\n技术心得 学习笔记 个人感悟 有趣的发现 未来的计划 走一步算一步吧，加油！\n下面是我学习的一些编程语言的Hello World程序。\nPython def hello_world(): print(\"Welcome to my blog!\") hello_world()\rJava public class HelloWorld { public static void main(String[] args) { System.out.println(\"Welcome to my blog!\"); } }\rC #include \u003cstdio.h\u003e int main() { printf(\"Welcome to my blog!\\n\"); return 0; }\rC++ #include \u003ciostream\u003e int main() { std::cout \u003c\u003c \"Welcome to my blog!\" \u003c\u003c std::endl; return 0; }\rHTML \u003c!DOCTYPE html\u003e \u003chtml\u003e \u003chead\u003e \u003ctitle\u003eWelcome to my blog!\u003c/title\u003e \u003c/head\u003e \u003cbody\u003e \u003ch1\u003eWelcome to my blog!\u003c/h1\u003e \u003c/body\u003e \u003c/html\u003e",
    "tags": [
      "博客",
      "介绍"
    ],
    "title": "Hello World",
    "uri": "/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \r标签",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签 :: 博客",
    "uri": "/tags/%E5%8D%9A%E5%AE%A2/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \r标签",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签 :: 介绍",
    "uri": "/tags/%E4%BB%8B%E7%BB%8D/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \r类别",
    "content": "",
    "description": "",
    "tags": [],
    "title": "类别 :: 随笔",
    "uri": "/categories/%E9%9A%8F%E7%AC%94/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \r标签",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签 :: SVG",
    "uri": "/tags/svg/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \rPosts",
    "content": "SVG（Scalable Vector Graphics）是一种基于XML的矢量图形格式。本专栏介绍自己学习svg过程中的一些笔记和重点，欢迎大家一起交流。\n什么是SVG？ SVG是一种使用XML描述二维图形的文件格式。SVG图像在放大或改变尺寸的情况下其图形质量不会有所损失。\n基本形状 SVG支持多种基本形状：\n矩形 (rect) 圆形 (circle) 椭圆 (ellipse) 线条 (line) 折线 (polyline) 多边形 (polygon) 路径 (path) 示例 这里是一个简单的SVG示例：\n\u003csvg width=\"100\" height=\"100\"\u003e \u003ccircle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" /\u003e \u003c/svg\u003e\r这个示例创建了一个红色的圆，带有黑色边框。\n总结 SVG是一个强大的图形格式，特别适合用于网页设计。",
    "description": "SVG（Scalable Vector Graphics）是一种基于XML的矢量图形格式。本专栏介绍自己学习svg过程中的一些笔记和重点，欢迎大家一起交流。\n什么是SVG？ SVG是一种使用XML描述二维图形的文件格式。SVG图像在放大或改变尺寸的情况下其图形质量不会有所损失。\n基本形状 SVG支持多种基本形状：\n矩形 (rect) 圆形 (circle) 椭圆 (ellipse) 线条 (line) 折线 (polyline) 多边形 (polygon) 路径 (path) 示例 这里是一个简单的SVG示例：\n\u003csvg width=\"100\" height=\"100\"\u003e \u003ccircle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"black\" stroke-width=\"3\" fill=\"red\" /\u003e \u003c/svg\u003e\r这个示例创建了一个红色的圆，带有黑色边框。\n总结 SVG是一个强大的图形格式，特别适合用于网页设计。",
    "tags": [
      "SVG",
      "笔记"
    ],
    "title": "SVG学习笔记",
    "uri": "/posts/svg/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \r标签",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签 :: 笔记",
    "uri": "/tags/%E7%AC%94%E8%AE%B0/index.html"
  },
  {
    "breadcrumb": "Hello World",
    "content": "一个苦逼的未来要当程序猿的大学生（哦不已经是了…）",
    "description": "一个苦逼的未来要当程序猿的大学生（哦不已经是了…）",
    "tags": [],
    "title": "关于我",
    "uri": "/about/index.html"
  },
  {
    "breadcrumb": "Hello World \u003e \rPosts \u003e \rSVG学习笔记",
    "content": "之前写大作业小游戏的时候就遇到过要自己找图片资源，当时第一次接触SVG图像，根本不了解，最近决定好好学习一下SVG。\nSVG是一种基于XML的矢量图形格式，它可以用来定义二维图形，且与常见的位图不同，缩放不会影响画质。因为它是用XML描述绘制图形的方法的，而不是像位图一样直接保存图片的单个像素点。\n关键概念 画布 ：无穷大，是绘制图形的区域。 裁切层 ：控制显示区域的框，在画布上框选出特定的区域来显示。 SVG区域大小 ：大小在svg标签中设定。也是最后页面上显示图片的大小。 解释 在写SVG代码的时候一开始会创建一个SVG标签：\n\u003csvg width=\"400\" height=\"400\"\u003e \u003c/svg\u003e\r这个就是要显示的SVG区域的大小。而SVG图形的绘制是在画布上进行的，这个画布我们是看不见的，同时画布有无穷大。我们可以在画布上绘制任意的图形，但是最后显示的SVG图片大小是固定的，当画布上绘制的图形大小与SVG区域大小不一致时，我们怎么控制显示画布上哪一部分呢？这时候就要用到裁切层来在画布上选择特定的区域来显示。下面先介绍SVG的一些基础的概念。\n坐标区域 SVG坐标区域的原点在左上角，向右为x轴正方向，向下为y轴正方向。 图形绘制 要绘制一个图形就很简单了，比如绘制一个矩形，只要设置它的左上角的坐标，以及长宽高即可，如何要填充颜色可以使用fill属性。\n\u003csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"\u003e \u003crect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"blue\" /\u003e \u003crect x=\"100\" y=\"100\" width=\"80\" height=\"30\" fill=\"red\" /\u003e \u003c/svg\u003e\r\u003csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"\u003e \u003crect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"blue\" /\u003e \u003crect x=\"200\" y=\"200\" width=\"80\" height=\"30\" fill=\"red\" /\u003e \u003c/svg\u003e\r可以看到因为默认的裁切层区域与svg区域大小是一样的，且左上角在原点处。\n设置裁切层 上面的代码绘制了两个矩形，但是只显示一个矩形，另一个矩形在裁切层之外，所以默认是不显示的。那么如何同时显示两个矩形呢？可以设置裁切层的位置，把两个矩形都框住。使用viewBox属性来设置裁切层的位置和大小。\n\u003csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 300\"\u003e \u003crect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"blue\" /\u003e \u003crect x=\"200\" y=\"200\" width=\"80\" height=\"30\" fill=\"red\" /\u003e \u003c/svg\u003e\r如果裁切层大小与svg区域大小相同，那正好，只要把画布整体平移，使裁切层与svg区域重合即可，但是如果裁切层大小和svg区域大小不相同怎么办？\n下面分两种情况讨论：\nsvg区域与裁切层的长宽比相同时，通过等比例缩放来使裁切层与svg区域重合，很简单，不单独讨论。 长宽比不同时，有两种填充方式，且通过属性preserveAspectRatio来控制。 svg区域与裁切层的长宽比不相同 下面的红色区域为SVG区域，绿色区域为裁切层。\n填满：裁切层完全覆盖svg区域，通过等比例缩放实现，这时裁切层内的内容不一定完全在svg区域内。比如下图中红色为svg区域，绿色为裁切层。填充时会将裁切层等比例放大知道能完全盖住svg区域。可以看到部分裁切层的内容不在svg区域内，最后不能显示。 完整展示：确保裁切层内容能完全处于svg区域内。且某一个方向铺满。比如上面同样的情况，会把裁切层区域先缩小，然后平移到svg区域使上下方向铺满，至于对齐方式也可以控制. 上述两种填充方式以及对齐都是通过属性preserveAspectRatio来控制的。\n对齐控制的值：xMinYMin，xMinYMax，xMaxYMax，xMaxYMin，xMinYMid，xMaxYMid，xMidYMid，xMidYMin，xMidYMax 平铺：slice(铺满) ，meet(裁切层全入) 默认：xMidYMid meet",
    "description": "之前写大作业小游戏的时候就遇到过要自己找图片资源，当时第一次接触SVG图像，根本不了解，最近决定好好学习一下SVG。\nSVG是一种基于XML的矢量图形格式，它可以用来定义二维图形，且与常见的位图不同，缩放不会影响画质。因为它是用XML描述绘制图形的方法的，而不是像位图一样直接保存图片的单个像素点。\n关键概念 画布 ：无穷大，是绘制图形的区域。 裁切层 ：控制显示区域的框，在画布上框选出特定的区域来显示。 SVG区域大小 ：大小在svg标签中设定。也是最后页面上显示图片的大小。 解释 在写SVG代码的时候一开始会创建一个SVG标签：\n\u003csvg width=\"400\" height=\"400\"\u003e \u003c/svg\u003e\r这个就是要显示的SVG区域的大小。而SVG图形的绘制是在画布上进行的，这个画布我们是看不见的，同时画布有无穷大。我们可以在画布上绘制任意的图形，但是最后显示的SVG图片大小是固定的，当画布上绘制的图形大小与SVG区域大小不一致时，我们怎么控制显示画布上哪一部分呢？这时候就要用到裁切层来在画布上选择特定的区域来显示。下面先介绍SVG的一些基础的概念。\n坐标区域 SVG坐标区域的原点在左上角，向右为x轴正方向，向下为y轴正方向。",
    "tags": [],
    "title": "SVG图形绘制与展示的逻辑",
    "uri": "/posts/svg-graphics/index.html"
  }
]
