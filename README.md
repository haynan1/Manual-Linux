# Manual Linux

Manual em ordem cronológica de aprendizado para estudar Linux, terminal, administração básica, ferramentas de recuperação, rede, servidores e boas práticas.

A ideia deste arquivo é crescer com o tempo. Quando aprender um comando novo, encaixe-o na seção correta usando este modelo:

````md
### comando

Função: explique para que serve.

Exemplo:
```bash
comando --opcao exemplo
```

Observações:
- detalhe importante
- cuidado necessário
````

## Sumário

1. [Fundamentos do Linux e do terminal](#1-fundamentos-do-linux-e-do-terminal)
2. [Ajuda, histórico e produtividade](#2-ajuda-historico-e-produtividade)
3. [Navegação no sistema de arquivos](#3-navegacao-no-sistema-de-arquivos)
4. [Listagem, leitura e visualização de arquivos](#4-listagem-leitura-e-visualizacao-de-arquivos)
5. [Criação, edição, cópia e organização](#5-criacao-edicao-copia-e-organizacao)
6. [Arquivos especiais, links e integridade](#6-arquivos-especiais-links-e-integridade)
7. [Usuários, grupos, permissões e propriedade](#7-usuarios-grupos-permissoes-e-propriedade)
8. [Remoção e comandos destrutivos](#8-remocao-e-comandos-destrutivos)
9. [Busca, curingas e localização](#9-busca-curingas-e-localizacao)
10. [Texto, filtros, redirecionamento e pipes](#10-texto-filtros-redirecionamento-e-pipes)
11. [Compactação, arquivamento, sincronização e backup](#11-compactacao-arquivamento-sincronizacao-e-backup)
12. [Pacotes no Debian, Ubuntu e derivados](#12-pacotes-no-debian-ubuntu-e-derivados)
13. [Shell, variáveis, alias e personalização](#13-shell-variaveis-alias-e-personalizacao)
14. [Processos, jobs e execução em segundo plano](#14-processos-jobs-e-execucao-em-segundo-plano)
15. [Serviços e logs com systemd](#15-servicos-e-logs-com-systemd)
16. [Rede, diagnóstico, SSH e firewall](#16-rede-diagnostico-ssh-e-firewall)
17. [Discos, pendrives, boot e recuperação](#17-discos-pendrives-boot-e-recuperacao)
18. [Espaço em disco e armazenamento](#18-espaco-em-disco-e-armazenamento)
19. [Hardware, sensores e monitoramento](#19-hardware-sensores-e-monitoramento)
20. [Agendamento e automação](#20-agendamento-e-automacao)
21. [Desenvolvimento, servidor web e banco de dados](#21-desenvolvimento-servidor-web-e-banco-de-dados)
22. [IA local com Ollama](#22-ia-local-com-ollama)
23. [Boas práticas](#23-boas-praticas)
24. [Referência rápida](#24-referencia-rapida)

## 1. Fundamentos do Linux e do terminal

### Terminal, pseudoterminal e shell

O terminal é a interface onde você digita comandos. Em ambientes gráficos, normalmente usamos um emulador de terminal, que cria um pseudoterminal.

O shell é o interpretador de comandos. Ele recebe o que você digita, interpreta e executa.

Exemplos comuns de shell:

- `bash`
- `zsh`

Ver a versão do Bash:

```bash
bash --version
```

### Comandos, parâmetros e argumentos

Um comando pode receber opções, também chamadas de parâmetros, e argumentos.

```bash
ls -lh /etc
```

Neste exemplo:

- `ls` é o comando.
- `-lh` são parâmetros.
- `/etc` é o argumento, ou seja, o local onde o comando será aplicado.

Linux diferencia letras maiúsculas de minúsculas:

- `Desktop` é diferente de `desktop`.
- `.bashrc` é diferente de `.Bashrc`.

### Diretórios essenciais

Símbolos importantes:

- `/` representa o diretório raiz do sistema.
- `~` representa a pasta do usuário atual.
- `.` representa o diretório atual.
- `..` representa o diretório anterior.

```bash
cd /
cd ~
cd .
cd ..
```

### Principais famílias Linux

Linux não é uma única distribuição. Existem famílias de distribuições, cada uma com filosofia, gerenciador de pacotes e público principal.

Família Debian:

- foco em estabilidade e grande repositório.
- usa pacotes `.deb`.
- usa `apt`, `apt-get` e `dpkg`.
- exemplos: Debian, Ubuntu, Linux Mint, Lubuntu.
- boa base para começar, estudar terminal e usar em máquinas pessoais ou de trabalho.

Família Red Hat, Fedora e derivados:

- forte no mercado corporativo, servidores e certificações.
- usa pacotes `.rpm`.
- usa `dnf` em sistemas modernos.
- exemplos: Fedora, Red Hat Enterprise Linux, Rocky Linux, AlmaLinux.
- boa família para estudar ambientes empresariais.

Família Arch:

- foco em controle, simplicidade técnica e sistema sempre atualizado.
- usa `pacman`.
- exemplos: Arch Linux, EndeavourOS, Manjaro.
- boa para aprofundar conhecimento, mas exige mais atenção.

Família Slackware:

- uma das famílias mais tradicionais.
- pouca automação e muito controle manual.
- útil para entender conceitos clássicos do Unix/Linux.

Família Gentoo:

- sistema construído com alto nível de personalização.
- usa compilação de pacotes como parte central do fluxo.
- recomendado para estudo avançado.

Outras bases importantes:

- openSUSE: conhecida pelo YaST e bom equilíbrio entre desktop e administração.
- Alpine Linux: muito leve, comum em containers.
- NixOS: configuração declarativa, avançada e reproduzível.
- Void Linux: independente, simples e rápida.

Caminho recomendado:

1. Comece por Debian, Ubuntu, Lubuntu ou Linux Mint.
2. Aprenda terminal, pacotes, arquivos e permissões.
3. Explore Fedora para conhecer o lado corporativo.
4. Estude Arch quando quiser mais controle.
5. Deixe Gentoo, NixOS e Slackware para uma fase avançada.

### Identificação do sistema

#### uname

Mostra informações do kernel e arquitetura.

```bash
uname
uname -a
uname -r
uname -m
```

#### hostnamectl

Mostra informações do sistema, hostname, kernel e virtualização.

```bash
hostnamectl
```

Alterar hostname:

```bash
sudo hostnamectl set-hostname novo-nome
```

Use com cuidado em servidores, porque o hostname pode ser usado por serviços de rede.

#### lsb_release

Mostra informações da distribuição.

```bash
lsb_release -a
```

Se não estiver instalado:

```bash
sudo apt install lsb-release -y
```

#### /etc/os-release

Arquivo padrão com informações da distribuição.

```bash
cat /etc/os-release
```

#### whoami

Mostra qual usuário está logado no terminal atual.

```bash
whoami
```

#### id

Mostra UID, GID e grupos do usuário.

```bash
id
id nome_do_usuario
```

#### groups

Mostra os grupos aos quais o usuário pertence.

```bash
groups
groups nome_do_usuario
```

## 2. Ajuda, histórico e produtividade

### Tab

A tecla `Tab` completa comandos, arquivos e diretórios. Pressionar `Tab` duas vezes pode mostrar sugestões.

```bash
apt-
```

### --help

Mostra ajuda rápida.

```bash
ls --help
```

### man

Abre o manual completo de um comando.

```bash
man ls
```

Dentro do `man`, normalmente usando `less`:

- `q` sai.
- `/palavra` busca.
- `n` vai para a próxima ocorrência.
- `N` volta para a anterior.

### tldr

Mostra exemplos práticos e resumidos.

```bash
tldr ls
tldr tar
tldr apt
```

Instalar:

```bash
sudo apt install tldr -y
```

### history

Mostra comandos digitados anteriormente.

```bash
history
```

Executar novamente pelo número:

```bash
!125
```

Também é possível usar seta para cima e seta para baixo no terminal.

### clear

Limpa a tela.

```bash
clear
```

### watch

Executa um comando repetidamente.

```bash
watch -n 1 date
watch -n 2 df -h
watch -n 1 "ps aux | grep python"
```

## 3. Navegação no sistema de arquivos

### pwd

Mostra o caminho completo do diretório atual.

```bash
pwd
```

### cd

Muda o diretório atual.

```bash
cd ~
cd ~/Downloads
cd ..
cd ../..
cd -
cd /
cd /home/usuario/Documentos
```

Explicação:

- `cd ~` vai para a pasta pessoal.
- `cd ~/Downloads` entra em Downloads.
- `cd ..` sobe um nível.
- `cd ../..` sobe dois níveis.
- `cd -` volta para o diretório anterior.
- `cd /` vai para a raiz.

## 4. Listagem, leitura e visualização de arquivos

### ls

Lista arquivos e diretórios.

```bash
ls
ls -l
ls -lh
ls -a
ls -lah
ls -R Cursos/
ls -Rla Cursos/
ls /bin
```

Em muitos terminais:

- azul indica diretórios.
- verde pode indicar executáveis.
- ciano pode indicar links simbólicos.

Exemplo de `ls -l`:

```text
drwxrwxr-x 4 haynan haynan 4096 set  6 15:10 Desktop
```

Como ler:

- `d` indica diretório.
- `rwx` do dono: pode ler, escrever e entrar.
- `rwx` do grupo: pode ler, escrever e entrar.
- `r-x` de outros: podem ler e entrar, mas não escrever.
- `haynan` é o proprietário.
- `4096` é o tamanho.
- `Desktop` é o nome.

### cat

Mostra o conteúdo de arquivos.

```bash
cat arquivo.txt
cat /etc/services
```

### tac

Mostra linhas de trás para frente.

```bash
tac arquivo.txt
```

### less

Abre arquivo com paginação.

```bash
less /etc/services
```

Atalhos:

- `q` sai.
- `/texto` busca.
- `n` próxima ocorrência.
- `N` ocorrência anterior.

### head

Mostra o início de um arquivo.

```bash
head arquivo.txt
head -n 20 arquivo.txt
```

### tail

Mostra o final de um arquivo.

```bash
tail arquivo.txt
tail -n 50 arquivo.log
tail -f arquivo.log
```

### file

Identifica o tipo real de arquivo.

```bash
file arquivo
file imagem.png
file script.sh
file programa
```

### Editores úteis

#### nano

Editor simples no terminal.

```bash
nano arquivo.txt
```

Atalhos:

- `Ctrl + O`: salva.
- `Enter`: confirma.
- `Ctrl + X`: sai.
- `Ctrl + G`: ajuda.

#### vim

Editor poderoso de terminal.

```bash
vim arquivo.txt
```

Comandos básicos:

```text
i
Esc
:w
:q
:wq
:q!
```

#### micro

Editor moderno e amigável.

```bash
sudo apt install micro -y
micro arquivo.txt
```

## 5. Criação, edição, cópia e organização

### mkdir

Cria diretórios.

```bash
mkdir Linux
mkdir Linux Curso Aviao
mkdir -p Cursos/Hardware/Modulo\ 1/
mkdir -p "Cursos/Hardware/Modulo 2/"
```

### Espaços em nomes

Use barra invertida ou aspas:

```bash
mkdir Modulo\ 1
mkdir "Modulo 1"
```

### touch

Cria arquivo vazio ou atualiza data de modificação.

```bash
touch oi.txt
```

### cp

Copia arquivos e diretórios.

```bash
cp origem.txt destino.txt
cp arquivo.txt Documentos/
cp -r pasta/ backup/
cp -a pasta/ backup/
```

`cp -a` preserva atributos e é útil para cópias mais fiéis.

### mv

Move ou renomeia arquivos e diretórios.

```bash
mv temporario temp
mv arquivo.txt Documentos/
```

### chmod +x e execução de scripts

Concede permissão de execução a um arquivo.

```bash
chmod +x script.sh
./script.sh
```

Antes de executar scripts, leia o conteúdo:

```bash
less script.sh
nano script.sh
```

## 6. Arquivos especiais, links e integridade

### ln

Cria links.

Link físico:

```bash
ln arquivo.txt link.txt
```

Link simbólico:

```bash
ln -s arquivo.txt atalho.txt
ln -s /caminho/real ~/atalho
```

Ver links:

```bash
ls -l
```

### readlink

Mostra para onde um link aponta.

```bash
readlink atalho.txt
readlink -f atalho.txt
```

### sha256sum

Calcula hash SHA-256.

```bash
sha256sum arquivo.iso
```

Comparar com hash oficial:

```bash
echo "HASH_OFICIAL  arquivo.iso" | sha256sum -c
```

### md5sum

Calcula hash MD5.

```bash
md5sum arquivo.iso
```

MD5 é antigo e não deve ser usado para segurança forte, mas ainda aparece em verificações simples.

### gpg

Usado para criptografia, assinatura e verificação de autenticidade.

```bash
gpg --version
gpg --import chave.asc
gpg --verify arquivo.sig arquivo.iso
```

Use para validar downloads oficiais em um nível mais profissional.

## 7. Usuários, grupos, permissões e propriedade

### adduser

Cria usuário de forma amigável.

```bash
sudo adduser joao
```

Normalmente cria usuário, senha, grupo padrão e pasta home.

### useradd

Cria usuário de forma mais direta e técnica.

```bash
sudo useradd -m -s /bin/bash joao
```

### passwd

Altera senha.

```bash
passwd
sudo passwd joao
```

### usermod

Modifica usuário existente.

Adicionar ao grupo `sudo`:

```bash
sudo usermod -aG sudo joao
```

Adicionar a outro grupo:

```bash
sudo usermod -aG grupo joao
```

`-aG` significa adicionar ao grupo sem remover grupos antigos. Usar apenas `-G` pode sobrescrever grupos anteriores.

### deluser

Remove usuário.

```bash
sudo deluser joao
sudo deluser --remove-home joao
```

### groupadd e groupdel

Cria e remove grupos.

```bash
sudo groupadd grupo
sudo groupdel grupo
```

### chmod numérico

Altera permissões usando números.

```bash
chmod 755 script.sh
chmod 644 arquivo.txt
chmod 700 arquivo_privado.sh
```

Tabela:

| Número | Permissão |
| --- | --- |
| 0 | nenhuma permissão |
| 1 | executar |
| 2 | escrever |
| 4 | ler |
| 5 | ler e executar |
| 6 | ler e escrever |
| 7 | ler, escrever e executar |

Exemplos:

- `644`: dono lê e escreve; grupo e outros só leem.
- `755`: dono faz tudo; grupo e outros leem e executam.
- `700`: somente o dono faz tudo.

### chmod recursivo

Altera permissões dentro de diretórios.

```bash
chmod -R 755 pasta/
```

Use com cuidado. Evite comandos como:

```bash
sudo chmod -R 777 /
```

### chown

Altera dono e grupo.

```bash
sudo chown usuario arquivo.txt
sudo chown usuario:grupo arquivo.txt
sudo chown haynan:haynan app.py
sudo chown -R haynan:haynan projeto/
```

Muito usado quando arquivos foram criados com `sudo` e ficam bloqueados para o usuário comum.

### chgrp

Altera apenas o grupo.

```bash
sudo chgrp grupo arquivo.txt
```

### umask

Define permissões padrão para novos arquivos e diretórios.

```bash
umask
umask 022
```

### stat

Mostra detalhes de um arquivo, incluindo permissões, dono, datas e inode.

```bash
stat arquivo.txt
```

## 8. Remoção e comandos destrutivos

### rmdir

Remove diretórios vazios.

```bash
rmdir Linux/
```

### rm

Remove arquivos.

```bash
rm Linux/oi.txt
```

### rm -rf

Remove diretórios e tudo dentro deles.

```bash
rm -rf Cursos/
```

Use com extremo cuidado.

Alias de segurança:

```bash
alias rm='rm -i'
alias rm='rm -I'
```

Exemplo perigoso:

```bash
rm -rf /* ~
```

Um espaço no lugar errado pode mudar totalmente o sentido do comando.

### shred

Sobrescreve arquivo para dificultar recuperação.

```bash
shred -u arquivo.txt
```

### wipefs

Remove assinaturas de sistemas de arquivos.

```bash
sudo wipefs -a /dev/sdb
```

Use apenas no disco correto.

### blkdiscard

Descarta blocos em SSDs compatíveis.

```bash
sudo blkdiscard /dev/sdX
```

Altamente destrutivo.

## 9. Busca, curingas e localização

### Curingas do shell

`*` representa qualquer quantidade de caracteres.

```bash
ls /etc/*.conf
ls /etc/*X*
ls /etc/f*
ls /etc/*{tab,swd}
ls /etc/*.{conf,db}
```

`?` representa exatamente um caractere.

```bash
ls /etc/?as*
ls /etc/?[a,e,i,o,u]???
```

`[]` representa lista ou intervalo.

```bash
ls /etc/f[a-i]*
ls /etc/p[a,c]*
ls /etc/[a-h]*
ls /etc/[a,c,z]*
```

`{}` alterna padrões.

```bash
ls /etc/?{am,ul}*
```

Diferença:

```bash
ls /etc/?{am,ul}*
ls /etc/?[am,ul]*
```

No primeiro caso, `{am,ul}` trabalha com sequências. No segundo, `[am,ul]` trabalha com caracteres individuais.

### find

Busca arquivos e diretórios em tempo real.

```bash
find . -name "arquivo.txt"
find . -iname "arquivo.txt"
find . -type d -name "config"
find . -type f -name "*.py"
find . -type f -size +100M
find . -type f -mtime -7
find . -type f -empty
find . -type d -empty
```

Remover arquivos encontrados:

```bash
find . -type f -name "*.tmp" -delete
```

Antes de usar `-delete`, teste sem apagar:

```bash
find . -type f -name "*.tmp"
```

### locate

Busca em banco de dados indexado.

```bash
locate arquivo
```

Instalar e atualizar índice:

```bash
sudo apt install plocate -y
sudo updatedb
```

Diferença:

| Comando | Característica |
| --- | --- |
| find | busca em tempo real |
| locate | busca em índice, geralmente mais rápido |

### which, whereis, type e command -v

Mostram onde está ou como o shell interpreta um comando.

```bash
which python
whereis python
type cd
command -v python3
```

## 10. Texto, filtros, redirecionamento e pipes

### grep

Busca texto.

```bash
grep "erro" arquivo.log
grep -i "erro" arquivo.log
grep -n "erro" arquivo.log
grep -r "senha" .
grep -r --include="*.py" "def " .
grep -v "debug" arquivo.log
grep -c "erro" arquivo.log
```

### cut

Recorta campos.

```bash
cut -d ':' -f 1 /etc/passwd
```

### sort

Ordena linhas.

```bash
sort arquivo.txt
sort -r arquivo.txt
sort -n numeros.txt
```

### uniq

Remove linhas duplicadas consecutivas.

```bash
uniq arquivo.txt
sort arquivo.txt | uniq
sort arquivo.txt | uniq -c
```

### wc

Conta linhas, palavras e bytes.

```bash
wc arquivo.txt
wc -l arquivo.txt
wc -w arquivo.txt
wc -c arquivo.txt
```

### sed

Substitui e transforma texto.

```bash
sed 's/antigo/novo/' arquivo.txt
sed 's/antigo/novo/g' arquivo.txt
sed -i 's/antigo/novo/g' arquivo.txt
```

### awk

Processa textos por colunas e padrões.

```bash
awk '{print $1}' arquivo.txt
awk '{print $1, $3}' arquivo.txt
awk -F ':' '{print $1}' /etc/passwd
awk '{soma += $1} END {print soma}' numeros.txt
```

### tr

Traduz ou remove caracteres.

```bash
echo "abc" | tr 'a-z' 'A-Z'
echo "A B C" | tr -d ' '
```

### tee

Grava saída em arquivo e também mostra na tela.

```bash
echo "texto" | tee arquivo.txt
echo "mais texto" | tee -a arquivo.txt
```

### Redirecionamentos

Sobrescrever arquivo:

```bash
comando > saida.txt
```

Adicionar ao final:

```bash
comando >> saida.txt
```

Usar arquivo como entrada:

```bash
comando < entrada.txt
```

Redirecionar erros:

```bash
comando_inexistente 2> erro.log
```

Redirecionar saída e erro:

```bash
comando &> saida_completa.log
```

### Pipe

Conecta a saída de um comando na entrada de outro.

```bash
ps aux | grep firefox
cat arquivo.log | grep -i erro | wc -l
```

## 11. Compactação, arquivamento, sincronização e backup

### tar

Empacota arquivos e diretórios.

```bash
tar -cvf backup.tar pasta/
tar -xvf backup.tar
tar -czvf backup.tar.gz pasta/
tar -xzvf backup.tar.gz
tar -cJvf backup.tar.xz pasta/
tar -xJvf backup.tar.xz
```

Opções:

- `-c`: cria.
- `-x`: extrai.
- `-v`: mostra detalhes.
- `-f`: indica arquivo.
- `-z`: usa gzip.
- `-J`: usa xz.

### zip e unzip

```bash
zip arquivo.zip arquivo.txt
zip -r projeto.zip projeto/
unzip arquivo.zip
unzip arquivo.zip -d destino/
```

### gzip e gunzip

```bash
gzip arquivo.txt
gunzip arquivo.txt.gz
```

### rsync

Sincroniza arquivos e diretórios com eficiência.

```bash
rsync -av origem/ destino/
rsync -avh --progress origem/ destino/
rsync -avh --delete origem/ destino/
rsync -avh projeto/ usuario@servidor:/home/usuario/projeto/
```

Diferença importante:

- `origem/` copia o conteúdo da pasta.
- `origem` copia a própria pasta.

### scp

Copia arquivos entre máquinas via SSH.

```bash
scp arquivo.txt usuario@ip:/home/usuario/
scp -r projeto/ usuario@ip:/home/usuario/
scp usuario@ip:/home/usuario/arquivo.txt .
```

## 12. Pacotes no Debian, Ubuntu e derivados

Distribuições como Debian, Ubuntu, Lubuntu e Linux Mint usam pacotes `.deb`.

Ferramentas importantes:

- `apt`: ferramenta principal para instalar, remover e buscar pacotes.
- `apt-get`: ferramenta tradicional, muito usada em scripts.
- `dpkg`: gerenciador de pacotes de baixo nível do Debian.

### sudo

Executa comando com permissão de administrador.

```bash
sudo apt update
```

### apt

```bash
apt moo
sudo apt update
sudo apt upgrade
sudo apt update && sudo apt upgrade -y
sudo apt install htop
sudo apt remove nome-do-pacote
apt search editor
apt show htop
apt policy htop
apt list --installed
apt list --installed | grep htop
sudo apt purge pacote
sudo apt autoremove
sudo apt clean
```

Diferença:

- `apt remove`: remove o programa.
- `apt purge`: remove programa e configurações globais.
- `apt clean`: limpa cache em `/var/cache/apt/archives/`.
- `apt autoremove`: remove dependências que não são mais necessárias.

### dpkg

```bash
sudo dpkg -i pacote.deb
sudo apt install -f
dpkg -l
dpkg -l | grep firefox
dpkg -L htop
dpkg -S /bin/ls
```

### LibreOffice em português

Se o LibreOffice estiver em inglês:

1. Abra o LibreOffice.
2. Acesse `Tools`.
3. Entre em `Options`.
4. Vá em `Language Settings`.
5. Abra `Languages`.
6. Em `User interface`, escolha `Portuguese (Brazil)`.
7. Reinicie.

Se a opção não aparecer:

```bash
sudo apt update
sudo apt install libreoffice-l10n-pt-br libreoffice-help-pt-br
```

Também configure:

- `Locale setting`: Portuguese (Brazil).
- `Default languages for documents`: Portuguese.

## 13. Shell, variáveis, alias e personalização

### .bashrc e .zshrc

O `.bashrc` é carregado quando você abre um shell interativo do Bash.

```bash
nano ~/.bashrc
source ~/.bashrc
```

No Zsh:

```bash
nano ~/.zshrc
source ~/.zshrc
```

Bash significa `Bourne Again Shell`. Foi criado por Brian Fox em 1989 para o projeto GNU.

Zsh significa `Z Shell`. Foi criado por Paul Falstad em 1990.

Instalar Oh My Zsh:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Variáveis de ambiente

Mostrar variáveis:

```bash
printenv
printenv PATH
env
```

Executar comando com variável temporária:

```bash
FLASK_DEBUG=1 python app.py
```

Exportar variável no shell atual:

```bash
export FLASK_DEBUG=1
echo $FLASK_DEBUG
```

Adicionar ao `.bashrc`:

```bash
echo 'export FLASK_DEBUG=1' >> ~/.bashrc
source ~/.bashrc
```

Remover variável:

```bash
unset FLASK_DEBUG
```

### Alias

Um alias é um apelido para um comando.

```bash
alias atualizar='sudo apt update && sudo apt upgrade -y'
atualizar
```

Temporário:

```bash
alias ola='echo "Olá, Hainan!"'
```

Regras:

- use aspas simples.
- não coloque espaço antes ou depois do `=`.
- use `&&` para encadear comandos.

Exemplos úteis:

```bash
alias atualizar='sudo apt update && sudo apt upgrade -y'
alias limparcache='sudo apt autoremove && sudo apt clean'
alias desligar='sudo shutdown now'
alias reiniciar='sudo reboot'
alias ..='cd ..'
alias ...='cd ../..'
alias home='cd ~'
alias desk='cd ~/Desktop'
alias dl='cd ~/Downloads'
alias py='python3'
alias cls='clear'
alias ls='ls --color=auto'
alias ll='ls -lh'
alias la='ls -lha'
alias grep='grep --color=auto'
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git pull'
alias pingg='ping google.com'
alias minhaip='curl ifconfig.me'
alias portas='sudo netstat -tulnp'
```

Organizar em arquivo separado:

```bash
nano ~/.meusalias
```

No final do `~/.bashrc`:

```bash
if [ -f ~/.meusalias ]; then
    . ~/.meusalias
fi
```

Ver e remover aliases:

```bash
alias
unalias nome_do_alias
```

Exemplo de função:

```bash
mkcd () {
  mkdir -p "$1"
  cd "$1"
}
```

Prompt colorido:

```bash
PS1='\[\e[1;32m\]\u@\h \[\e[1;34m\]\w \$\[\e[0m\] '
```

## 14. Processos, jobs e execução em segundo plano

### ps

Mostra processos.

```bash
ps
ps aux
ps aux | grep firefox
```

### pgrep

Busca PID pelo nome.

```bash
pgrep firefox
pgrep -a firefox
```

### kill, pkill e killall

```bash
kill PID
kill -9 PID
kill -9 1234
pkill firefox
pkill -9 firefox
killall firefox
```

Use `kill -9` apenas quando o encerramento normal falhar.

### nice e renice

Ajustam prioridade.

```bash
nice -n 10 comando
sudo renice -n 5 -p PID
```

### jobs, bg e fg

Gerenciam tarefas no shell atual.

```bash
jobs
bg %1
fg %1
```

### nohup

Executa comando que continua depois de fechar o terminal.

```bash
nohup comando &
```

## 15. Serviços e logs com systemd

### systemctl

Gerencia serviços.

```bash
systemctl status ssh
sudo systemctl status nginx
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo systemctl enable nginx
sudo systemctl disable nginx
systemctl list-units
systemctl list-units --type=service
```

### journalctl

Consulta logs do systemd.

```bash
journalctl
journalctl -u nginx
journalctl -u nginx -f
journalctl -xe
```

Muito útil quando Flask, Nginx, MySQL, MariaDB ou SSH falham.

## 16. Rede, diagnóstico, SSH e firewall

### ping

Testa conexão.

```bash
ping google.com
```

Parar:

```text
Ctrl + C
```

### ip

Mostra interfaces e rotas.

```bash
ip addr
ip a
ip route
ip route | grep default
```

### ss e netstat

Mostram portas e conexões.

```bash
ss -tulnp
sudo ss -tulnp
sudo netstat -tulnp
```

Instalar `netstat`:

```bash
sudo apt install net-tools -y
```

### curl

Faz requisições HTTP, baixa arquivos e testa APIs.

```bash
curl https://example.com
curl -I https://example.com
curl -L https://example.com
curl -O https://site.com/arquivo.zip
curl ifconfig.me
```

Testar API:

```bash
curl -X POST https://api.exemplo.com \
  -H "Content-Type: application/json" \
  -d '{"nome":"Haynan"}'
```

### wget

Baixa arquivos.

```bash
wget https://site.com/arquivo.iso
wget -O debian.iso https://site.com/arquivo.iso
wget -c https://site.com/arquivo.iso
```

### dig, nslookup, traceroute e mtr

Diagnóstico DNS e rota.

```bash
dig google.com
dig +short google.com
dig MX gmail.com
nslookup google.com
traceroute google.com
mtr google.com
```

Instalar:

```bash
sudo apt install dnsutils traceroute mtr -y
```

### SSH

Acessa máquinas remotamente.

```bash
ssh usuario@ip
ssh -i chave.pem usuario@ip
ssh -p 2222 usuario@ip
```

Gerar chaves:

```bash
ssh-keygen -t ed25519 -C "seu-email@example.com"
ssh-keygen -t rsa -b 4096 -C "seu-email@example.com"
```

Copiar chave pública:

```bash
ssh-copy-id usuario@ip
```

Configurar atalhos:

```bash
nano ~/.ssh/config
```

Exemplo:

```text
Host minha-vm
    HostName 123.123.123.123
    User ubuntu
    IdentityFile ~/.ssh/chave.pem
```

Conectar:

```bash
ssh minha-vm
```

### UFW

Firewall simples.

```bash
sudo ufw status
sudo ufw status verbose
sudo ufw allow OpenSSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 'Nginx Full'
sudo ufw deny 3306/tcp
sudo ufw delete allow 80/tcp
sudo ufw enable
```

Em servidor remoto, libere SSH antes de ativar o firewall.

## 17. Discos, pendrives, boot e recuperação

### Conceitos

No Linux, dispositivos aparecem como arquivos.

```text
/dev/sdb
/dev/sdc
/dev/nvme0n1
```

Partições aparecem com números:

```text
/dev/sdb1
/dev/sdb2
```

Diferença:

- `/dev/sdb` é o disco inteiro.
- `/dev/sdb1` é uma partição.

Ponto de montagem comum:

```text
/media/seu_usuario/NOME_DO_PENDRIVE
```

### lsblk e fdisk

```bash
lsblk
lsblk -f
sudo fdisk -l
```

Use sempre antes de formatar, gravar ISO, usar `dd`, `mkfs`, `wipefs` ou `parted`.

### Sistemas de arquivos

| Sistema | Compatibilidade | Uso recomendado |
| --- | --- | --- |
| FAT32 | Linux, Windows, macOS, TVs, carros e consoles | máximo de compatibilidade, mas limita arquivos a 4 GB |
| exFAT | Linux moderno, Windows e macOS | melhor opção geral para pendrives grandes |
| NTFS | Windows e Linux | útil quando o foco é Windows |
| ext4 | Linux | melhor para uso apenas em Linux |

Instalar suporte exFAT:

```bash
sudo apt update
sudo apt install exfatprogs -y
```

### Montar, desmontar e formatar

```bash
mkdir ~/pendrive
sudo mount /dev/sdb1 ~/pendrive
sudo umount ~/pendrive
sudo umount /dev/sdb1
udisksctl mount -b /dev/sdb1
sudo mkfs.exfat /dev/sdb1
sudo mkfs.vfat -F 32 /dev/sdb1
sudo mkfs.ext4 /dev/sdb1
```

`mkfs` apaga os dados da partição escolhida.

### Renomear pendrive exFAT

```bash
sudo umount /dev/sdb1
sudo exfatlabel /dev/sdb1 HAYNAN_USB
udisksctl mount -b /dev/sdb1
lsblk -f
```

### Reset completo de pendrive

Exemplo considerando pendrive em `/dev/sdb`:

```bash
lsblk
sudo umount /dev/sdb1 2>/dev/null
sudo umount /dev/sdb2 2>/dev/null
sudo wipefs -a /dev/sdb
sudo parted /dev/sdb --script mklabel msdos
sudo parted /dev/sdb --script mkpart primary 0% 100%
sudo partprobe /dev/sdb
sudo mkfs.exfat /dev/sdb1
sudo exfatlabel /dev/sdb1 HAYNAN_USB
udisksctl mount -b /dev/sdb1
lsblk -f
```

### Criar pendrive bootável com dd

```bash
sudo dd if=arquivo.iso of=/dev/sdb bs=4M status=progress conv=fsync
```

Use o disco inteiro, como `/dev/sdb`, e não a partição `/dev/sdb1`. Tudo no pendrive será apagado.

### Balena Etcher

Ferramenta gráfica para gravar ISOs.

Uso:

1. Abra o Balena Etcher.
2. Clique em `Flash from file`.
3. Selecione a ISO.
4. Escolha o pendrive.
5. Clique em `Flash`.
6. Aguarde a validação.

Links oficiais:

- <https://etcher.balena.io>
- <https://github.com/balena-io/etcher>

### Ventoy

Prepara um pendrive uma vez e permite copiar várias ISOs.

Fluxo:

1. Instale o Ventoy no pendrive.
2. Copie arquivos `.iso` para o pendrive.
3. Reinicie o computador.
4. Dê boot pelo pendrive.
5. Escolha a ISO no menu.

Link oficial:

- <https://www.ventoy.net>

### MBR, GPT, BIOS e UEFI

- BIOS/Legacy: padrão antigo.
- UEFI: padrão moderno.
- MBR: tabela antiga, comum em máquinas antigas.
- GPT: tabela moderna, comum com UEFI.
- CSM: compatibilidade para boot legado.
- Secure Boot: recurso UEFI que pode bloquear sistemas não assinados.

Em notebooks antigos, pode ser necessário ativar Legacy/CSM, usar MBR ou desativar Secure Boot.

### Instalação Linux leve com Debian XFCE

Objetivo: instalar um sistema leve e estável em notebooks fracos.

1. Baixe a ISO oficial em <https://www.debian.org/download>.
2. Use Balena Etcher ou Ventoy.
3. Configure BIOS/UEFI para boot pelo pendrive.
4. Escolha idioma e teclado.
5. Configure rede.
6. Crie usuário e senha.
7. Escolha o disco com cuidado.
8. Marque `XFCE`.
9. Desmarque ambientes mais pesados que não pretende usar.

Pós-instalação:

```bash
sudo apt update && sudo apt upgrade
```

Boas práticas:

- não misture repositórios de distribuições diferentes.
- evite misturar Debian com repositórios de MX, Ubuntu ou Kali.
- instale apenas o necessário em notebooks fracos.

### ISOs do Windows e fontes oficiais

Priorize fontes oficiais da Microsoft:

- baixe ISOs apenas de páginas oficiais.
- use licença válida.
- evite ISOs modificadas, ativadores, cracks e scripts de procedência duvidosa.
- no Linux, grave com ferramentas legítimas como Ventoy, Balena Etcher ou `dd`, quando compatível.

Dependências comuns em fluxos de manipulação de imagem:

```bash
sudo apt install aria2 cabextract wimtools genisoimage chntpw
```

| Ferramenta | Função |
| --- | --- |
| aria2 | download paralelo e retomável |
| cabextract | extração de arquivos `.cab` |
| wimtools | manipulação de imagens `.wim` |
| genisoimage | criação de imagens ISO |
| chntpw | manutenção offline; use apenas em máquinas próprias ou autorizadas |

### Kits oficiais de recuperação

Política deste manual:

- usar apenas ferramentas oficiais, livres, abertas ou fornecidas por seus mantenedores.
- evitar ISOs modificadas de terceiros, coleções obscuras, cracks e ativadores.
- usar ferramentas de senha, disco ou recuperação apenas em máquinas próprias ou com autorização explícita.

| Ferramenta | Uso principal | Site oficial |
| --- | --- | --- |
| Rescuezilla | backup, restauração e clonagem com interface gráfica | <https://rescuezilla.com> |
| Clonezilla Live | clonagem e imagem de disco | <https://clonezilla.org> |
| GParted Live | particionamento e correção de partições | <https://gparted.org/livecd.php> |
| SystemRescue | manutenção, recuperação e administração Linux | <https://www.system-rescue.org> |
| Memtest86+ | teste de memória RAM | <https://www.memtest.org> |
| Debian Live | ambiente Linux oficial para teste e recuperação básica | <https://www.debian.org/CD/live/> |
| Ubuntu Live | ambiente oficial para teste, instalação e recuperação básica | <https://ubuntu.com/download> |
| Fedora Media Writer | criação oficial de mídias Fedora | <https://fedoraproject.org/workstation/download> |

Fluxo profissional:

1. Diagnóstico.
2. Backup.
3. Imagem/clonagem se o disco estiver falhando.
4. Correção.
5. Teste final.

## 18. Espaço em disco e armazenamento

### df

Mostra uso das partições.

```bash
df -h
```

### du

Mostra tamanho de arquivos e pastas.

```bash
du -sh pasta/
du -h --max-depth=1
du -h --max-depth=1 | sort -h
```

### ncdu

Analisador interativo de uso de disco.

```bash
sudo apt install ncdu -y
ncdu
sudo ncdu /
```

### ls -lhS

Lista arquivos ordenados por tamanho.

```bash
ls -lhS
ls -lhSr
```

### find para arquivos grandes

```bash
sudo find / -type f -size +1G 2>/dev/null
sudo find / -type f -size +500M 2>/dev/null
```

## 19. Hardware, sensores e monitoramento

### CPU e processos

```bash
lscpu
nproc
htop
watch -n 1 "cat /proc/cpuinfo | grep 'MHz'"
```

Instalar `htop`:

```bash
sudo apt install htop -y
```

No `htop`:

- `F5` mostra processos em árvore.
- `F10` sai.

### Sensores e temperatura

```bash
sudo apt update && sudo apt install lm-sensors hddtemp -y
sudo sensors-detect
sensors
watch -n 2 sensors
sudo hddtemp /dev/sda
sudo apt install psensor -y
```

### Nomenclaturas de sensores

- `BAT0`, `BAT1`: baterias.
- `in0`: tensão.
- `power1`: potência instantânea.
- `coretemp-isa-0000`: sensores internos de CPUs Intel.
- `Package id 0`: temperatura geral do processador.
- `Core 0`, `Core 1`: temperatura de cada núcleo.
- `acpitz-acpi-0`: zona térmica definida pelo firmware.
- `amdgpu-pci-0100`: GPU AMD.
- `nouveau-pci-0100`: driver aberto para NVIDIA.
- `hddtemp`: temperatura de discos via S.M.A.R.T.

Valores de referência:

- CPU normal: 40°C a 70°C.
- CPU em carga pesada: até 90°C.
- CPU crítica: geralmente entre 100°C e 105°C.
- GPU normal: 40°C a 80°C.
- Disco normal: 25°C a 50°C.
- Disco crítico: acima de 60°C.

CPU em 100% não significa, por si só, dano. O risco real é superaquecimento. Processadores modernos reduzem frequência quando chegam perto do limite térmico, processo chamado `throttling`.

### Dispositivos

```bash
lspci
lspci | grep -i vga
lspci | grep -i audio
lsusb
dmesg
dmesg | tail
sudo dmesg -w
dmesg | grep -i usb
dmesg | grep -i error
```

### Relatórios de hardware

```bash
sudo apt install inxi -y
inxi -Fxz
inxi -C
inxi -G
inxi -A
inxi -N
sudo lshw
sudo lshw -short
sudo lshw -html > hardware.html
free -h
swapon --show
```

## 20. Agendamento e automação

### crontab

Agenda tarefas periódicas.

```bash
crontab -e
crontab -l
crontab -r
```

Exemplo: rodar script todo dia às 2h:

```cron
0 2 * * * /home/haynan/backup.sh
```

Formato:

```text
minuto hora dia_do_mes mes dia_da_semana comando
```

Exemplos:

```cron
*/5 * * * * comando
0 8 * * 1 comando
```

### at

Agenda tarefa única.

```bash
sudo apt install at -y
sudo systemctl enable --now atd
at 15:30
atq
atrm numero
```

Após `at 15:30`, digite o comando e finalize com `Ctrl + D`.

## 21. Desenvolvimento, servidor web e banco de dados

### Python

Criar ambiente virtual:

```bash
python3 -m venv venv
source venv/bin/activate
deactivate
```

Usar `pip`:

```bash
pip install flask
pip install -r requirements.txt
pip freeze > requirements.txt
```

### make

Executa tarefas definidas em um `Makefile`.

```bash
sudo apt install make -y
make
make install
make run
make clean
```

### Nginx

Testar configuração:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo nginx -t && sudo systemctl reload nginx
```

### Certbot

Gera certificados HTTPS com Let's Encrypt.

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx
sudo certbot renew --dry-run
```

### MySQL e MariaDB

Acessar:

```bash
mysql -u usuario -p
sudo mysql
```

Backup e restauração:

```bash
mysqldump -u usuario -p nome_banco > backup.sql
mysql -u usuario -p nome_banco < backup.sql
mysqldump -u root -p --all-databases > todos_bancos.sql
```

Serviços:

```bash
sudo systemctl status mariadb
sudo systemctl restart mariadb
sudo systemctl enable mariadb
sudo systemctl status mysql
sudo systemctl restart mysql
sudo systemctl enable mysql
```

## 22. IA local com Ollama

### Requisitos

- Linux leve, como Lubuntu, Mint XFCE, Debian XFCE ou Ubuntu.
- 4 GB de RAM com swap configurada.
- internet para instalar e baixar modelos.
- terminal com Bash ou Zsh.

### Instalar Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama --version
```

### Baixar modelos leves

```bash
ollama pull qwen2.5:0.5b-instruct
ollama pull qwen2.5:1.5b-instruct
```

### Rodar modelos

```bash
ollama run qwen2.5:0.5b-instruct
ollama run qwen2.5:1.5b-instruct
```

### Alias para Ollama

```bash
alias IA='OLLAMA_NUM_THREADS=2 OLLAMA_NUM_CTX=512 ollama run qwen2.5:0.5b-instruct -n 192'
alias IA2='OLLAMA_NUM_THREADS=2 OLLAMA_NUM_CTX=768 ollama run qwen2.5:1.5b-instruct -n 256'
```

### Comandos úteis

```bash
ollama list
ollama rm nome-do-modelo
ollama pull nome-do-modelo
```

Encerrar:

```text
Ctrl + C
```

Procurar e encerrar processo:

```bash
ps aux | grep ollama
kill -9 PID
```

Rodar em segundo plano:

```bash
ollama run qwen2.5:1.5b-instruct &
jobs
kill %1
```

Usar `tmux`:

```bash
tmux new -s ia
ollama run qwen2.5:1.5b-instruct
tmux attach -t ia
```

Para sair da sessão sem encerrar: `Ctrl + B`, depois `D`.

## 23. Boas práticas

### Leia antes de executar

Antes de executar comandos com `sudo`, `rm`, `chmod`, `chown`, `dd`, `mkfs`, `wipefs`, `parted` ou redirecionamentos, leia o comando inteiro.

### Use fontes oficiais

Para sistemas, ISOs, ferramentas de recuperação e instaladores:

- prefira sites oficiais.
- valide hash quando disponível.
- evite ISOs modificadas.
- evite ativadores, cracks e scripts sem origem clara.

### Faça testes em pastas temporárias

```bash
mkdir ~/teste-linux
cd ~/teste-linux
touch a.txt b.txt c.log
mkdir pasta1 pasta2
```

### Prefira clareza ao estudar

Escreva comandos completos até entender:

```bash
ls -l -a -h
```

Depois use formas curtas:

```bash
ls -lah
```

### Segurança operacional

Ver permissões sudo:

```bash
sudo -l
```

Ver logins:

```bash
last
lastlog
who
w
sudo faillock
```

`faillock` pode variar conforme a distribuição.

### Ordem recomendada de estudo

1. Sistema e identificação.
2. Navegação.
3. Arquivos e diretórios.
4. Permissões.
5. Busca.
6. Texto, pipes e redirecionamentos.
7. Processos e jobs.
8. Pacotes.
9. Discos e armazenamento.
10. Rede.
11. SSH e firewall.
12. Serviços e logs.
13. Backup e compactação.
14. Agendamento.
15. Servidor web e banco de dados.

Dominar Linux não é decorar uma lista: é aprender a conversar com a máquina. Cada comando é uma palavra; cada pipe é uma frase; cada script é uma pequena arquitetura.

## 24. Referência rápida

### Sistema

```bash
uname -a
hostnamectl
lsb_release -a
cat /etc/os-release
whoami
id
groups
```

### Navegação

```bash
pwd
cd ~
cd ..
cd -
ls
ls -lah
```

### Arquivos

```bash
mkdir pasta
mkdir -p caminho/completo
touch arquivo.txt
nano arquivo.txt
cat arquivo.txt
less arquivo.txt
cp arquivo destino
cp -r pasta destino
mv antigo novo
rm arquivo.txt
rmdir pasta-vazia
rm -rf pasta
```

### Usuários e permissões

```bash
sudo adduser usuario
sudo usermod -aG sudo usuario
sudo passwd usuario
sudo deluser usuario
sudo groupadd grupo
chmod 755 arquivo
chmod 644 arquivo
sudo chown usuario:grupo arquivo
sudo chown -R usuario:grupo pasta/
stat arquivo
umask
```

### Busca

```bash
find . -name "arquivo"
find . -type f -size +100M
locate arquivo
which comando
whereis comando
type comando
command -v comando
```

### Texto

```bash
head arquivo
tail arquivo
tail -f arquivo.log
grep -i "erro" arquivo.log
cut -d ':' -f 1 arquivo
sort arquivo
uniq arquivo
wc -l arquivo
sed 's/antigo/novo/g' arquivo
awk '{print $1}' arquivo
tee arquivo
```

### Processos

```bash
ps aux
pgrep -a processo
kill PID
pkill processo
killall processo
jobs
bg
fg
nohup comando &
```

### Serviços

```bash
systemctl status servico
sudo systemctl start servico
sudo systemctl stop servico
sudo systemctl restart servico
sudo systemctl enable servico
sudo systemctl disable servico
journalctl -u servico
journalctl -u servico -f
journalctl -xe
```

### Rede e SSH

```bash
ip a
ip route
ss -tulnp
curl -I site.com
wget arquivo
dig dominio.com
nslookup dominio.com
traceroute dominio.com
mtr dominio.com
ssh usuario@ip
ssh -i chave.pem usuario@ip
ssh-keygen -t ed25519 -C "email"
ssh-copy-id usuario@ip
```

### Firewall

```bash
sudo ufw status
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw delete allow 80/tcp
```

### Disco

```bash
lsblk
lsblk -f
sudo fdisk -l
df -h
du -sh pasta/
du -h --max-depth=1
ncdu
sudo find / -type f -size +1G 2>/dev/null
sudo umount /dev/sdb1
sudo mkfs.exfat /dev/sdb1
sudo dd if=arquivo.iso of=/dev/sdb bs=4M status=progress conv=fsync
```

### Compactação e backup

```bash
tar -czvf backup.tar.gz pasta/
tar -xzvf backup.tar.gz
zip -r arquivo.zip pasta/
unzip arquivo.zip
gzip arquivo
gunzip arquivo.gz
rsync -avh origem/ destino/
rsync -avh --progress origem/ destino/
scp arquivo usuario@ip:/destino/
```

### Pacotes

```bash
sudo apt update
sudo apt upgrade
sudo apt install pacote
sudo apt remove pacote
apt search palavra
apt show pacote
apt policy pacote
apt list --installed
sudo apt purge pacote
sudo apt autoremove
sudo apt clean
sudo dpkg -i pacote.deb
dpkg -l
dpkg -L pacote
dpkg -S /caminho/arquivo
```

### Variáveis e shell

```bash
printenv
env
export VARIAVEL=valor
echo $VARIAVEL
unset VARIAVEL
nano ~/.bashrc
source ~/.bashrc
alias
unalias nome
```

### Agendamento

```bash
crontab -e
crontab -l
crontab -r
at 15:30
atq
atrm numero
```

### Hardware e monitoramento

```bash
lscpu
nproc
htop
sensors
watch -n 2 sensors
lspci
lsusb
dmesg
sudo dmesg -w
inxi -Fxz
sudo lshw -short
free -h
swapon --show
```

### Integridade

```bash
sha256sum arquivo.iso
md5sum arquivo.iso
gpg --verify assinatura arquivo
```

### Ollama

```bash
ollama --version
ollama list
ollama pull qwen2.5:0.5b-instruct
ollama run qwen2.5:0.5b-instruct
```
