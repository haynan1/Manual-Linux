# Manual Linux

Este manual organiza as anotações de terminal em uma ordem cronológica de aprendizado: primeiro os conceitos básicos, depois navegação, arquivos, busca por padrões, pacotes, personalização e monitoramento.

A ideia é que este arquivo continue crescendo. Quando aprender um comando novo, adicione na seção correspondente usando este modelo:

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

1. [Fundamentos do terminal](#1-fundamentos-do-terminal)
2. [Ajuda, histórico e produtividade](#2-ajuda-historico-e-produtividade)
3. [Navegação no sistema de arquivos](#3-navegacao-no-sistema-de-arquivos)
4. [Listagem e leitura de arquivos](#4-listagem-e-leitura-de-arquivos)
5. [Criação, edição e organização](#5-criacao-edicao-e-organizacao)
6. [Remoção de arquivos e diretórios](#6-remocao-de-arquivos-e-diretorios)
7. [Referência global e curingas](#7-referencia-global-e-curingas)
8. [Pacotes no Debian, Ubuntu e derivados](#8-pacotes-no-debian-ubuntu-e-derivados)
9. [Discos, pendrives e mídias bootáveis](#9-discos-pendrives-e-midias-bootaveis)
10. [Alias e personalização do shell](#10-alias-e-personalizacao-do-shell)
11. [Monitoramento do sistema e hardware](#11-monitoramento-do-sistema-e-hardware)
12. [IA local com Ollama](#12-ia-local-com-ollama)
13. [Comandos rápidos de rede](#13-comandos-rapidos-de-rede)
14. [Boas práticas e cuidados](#14-boas-praticas-e-cuidados)
15. [Referência rápida](#15-referencia-rapida)

## 1. Fundamentos do terminal

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

Exemplo:

```bash
ls -lh /etc
```

Neste exemplo:

- `ls` é o comando.
- `-lh` são parâmetros.
- `/etc` é o argumento, ou seja, o local onde o comando será aplicado.

### Sensibilidade a maiúsculas e minúsculas

Linux diferencia letras maiúsculas de minúsculas.

Exemplo:

- `Desktop` é diferente de `desktop`.
- `.bashrc` é diferente de `.Bashrc`.

### O diretório raiz e o diretório do usuário

Símbolos importantes:

- `/` representa o diretório raiz do sistema.
- `~` representa a pasta do usuário atual.
- `.` representa o diretório atual.
- `..` representa o diretório anterior.

Exemplos:

```bash
cd /
cd ~
cd .
cd ..
```

### Principais famílias Linux

Linux não é uma única distribuição. Existem famílias de distribuições, cada uma com filosofia, gerenciador de pacotes e público principal.

Família Debian:

- foco em estabilidade e grande repositório de pacotes.
- usa pacotes `.deb`.
- usa `apt`, `apt-get` e `dpkg`.
- exemplos: Debian, Ubuntu, Linux Mint, Lubuntu.
- boa base para começar, estudar terminal e usar em máquinas pessoais ou de trabalho.

Família Red Hat, Fedora e derivados:

- forte no mercado corporativo, servidores e certificações profissionais.
- usa pacotes `.rpm`.
- usa `dnf` em sistemas modernos.
- exemplos: Fedora, Red Hat Enterprise Linux, Rocky Linux, AlmaLinux.
- boa família para estudar ambientes empresariais.

Família Arch:

- foco em controle, simplicidade técnica e sistema sempre atualizado.
- usa `pacman`.
- exemplos: Arch Linux, EndeavourOS, Manjaro.
- boa para aprofundar conhecimento, mas exige mais atenção do usuário.

Família Slackware:

- uma das famílias mais tradicionais.
- pouca automação e muito controle manual.
- útil para entender conceitos clássicos do Unix/Linux.

Família Gentoo:

- sistema construído com alto nível de personalização.
- usa compilação de pacotes como parte central do fluxo.
- recomendado para estudo avançado, não como primeira distribuição.

Outras bases importantes:

- openSUSE: conhecida pelo YaST e bom equilíbrio entre desktop e administração.
- Alpine Linux: muito leve, comum em containers.
- NixOS: configuração declarativa, avançada e reproduzível.
- Void Linux: independente, simples e rápida.

Caminho recomendado de aprendizado:

1. Comece por Debian, Ubuntu, Lubuntu ou Linux Mint.
2. Aprenda bem terminal, pacotes, arquivos e permissões.
3. Depois explore Fedora para conhecer o lado corporativo.
4. Estude Arch quando quiser entender o sistema com mais controle.
5. Deixe Gentoo, NixOS e Slackware para uma fase mais avançada.

## 2. Ajuda, histórico e produtividade

### Tab

A tecla `Tab` ajuda a completar comandos, nomes de arquivos e nomes de diretórios.

Se você apertar `Tab` duas vezes, o terminal pode mostrar sugestões disponíveis.

Exemplo:

```bash
apt-
```

Depois pressione `Tab` duas vezes para ver comandos relacionados ao `apt`.

### --help

Mostra ajuda rápida de um comando.

```bash
ls --help
```

### man

Abre o manual completo de um comando.

```bash
man ls
```

O `man` normalmente usa o paginador `less`. Dentro dele:

- `q` sai do manual.
- `/palavra` busca uma palavra.
- `n` vai para a próxima ocorrência.
- `N` volta para a ocorrência anterior.

### tldr

O `tldr` mostra exemplos práticos e resumidos de comandos.

```bash
tldr ls
tldr tar
tldr apt
```

Se não estiver instalado:

```bash
sudo apt install tldr -y
```

### history

Mostra comandos digitados anteriormente.

```bash
history
```

Executar novamente um comando pelo número:

```bash
!125
```

Também é possível usar as setas do teclado:

- seta para cima: volta no histórico.
- seta para baixo: avança no histórico.

### clear

Limpa a tela do terminal.

```bash
clear
```

## 3. Navegação no sistema de arquivos

### pwd

Mostra o caminho completo do diretório atual.

```bash
pwd
```

`pwd` significa `print working directory`.

### cd

Muda o diretório atual.

`cd` significa `change directory`.

Exemplos:

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

- `cd ~` vai para a pasta pessoal do usuário.
- `cd ~/Downloads` entra na pasta Downloads.
- `cd ..` sobe um nível.
- `cd ../..` sobe dois níveis.
- `cd -` volta para o diretório anterior.
- `cd /` vai para a raiz do sistema.

Atalho útil para voltar direto para uma pasta específica:

```bash
cd ~/Documentos
```

Isso evita ter que usar vários `cd ..`.

## 4. Listagem e leitura de arquivos

### ls

Lista arquivos e diretórios.

```bash
ls
```

Em muitos terminais:

- azul indica diretórios.
- verde pode indicar executáveis.
- ciano pode indicar links simbólicos.

### ls -l

Mostra a listagem longa, com mais detalhes.

```bash
ls -l
```

Exemplo de saída:

```text
drwxrwxr-x 4 haynan haynan 4096 set  6 15:10 Desktop
```

Como ler:

- `d` indica diretório.
- `rwx` do dono: pode ler, escrever e entrar.
- `rwx` do grupo: pode ler, escrever e entrar.
- `r-x` de outros usuários: podem ler e entrar, mas não escrever.
- `4` indica a quantidade de links/diretórios relacionados.
- `haynan` é o proprietário.
- `haynan` é o grupo proprietário.
- `4096` é o tamanho.
- `set 6 15:10` é a data e hora de modificação.
- `Desktop` é o nome do diretório.

### ls -h

Mostra tamanhos em formato mais legível para humanos.

```bash
ls -lh
```

### ls -a

Mostra arquivos ocultos.

```bash
ls -a
```

Arquivos ocultos começam com ponto, por exemplo:

```text
.bashrc
.profile
.config
```

### Juntando parâmetros

Parâmetros podem ser combinados.

```bash
ls -l -a -h
ls -lah
```

Os dois exemplos fazem a mesma coisa.

### ls -R

Lista diretórios de forma recursiva.

```bash
ls -R Cursos/
ls -Rla Cursos/
```

### ls /bin

Mostra vários comandos disponíveis no sistema.

```bash
ls /bin
```

### cat

Mostra o conteúdo de arquivos no terminal.

```bash
cat arquivo.txt
cat /etc/services
```

`cat` vem de concatenar: ele pode juntar conteúdos e imprimir na saída padrão.

### tac

Mostra o conteúdo de um arquivo de trás para frente, invertendo a ordem das linhas.

```bash
tac arquivo.txt
```

### less

Abre um arquivo com paginação.

```bash
less /etc/services
```

Dentro do `less`:

- `q` sai.
- `/texto` busca texto.
- `n` vai para a próxima ocorrência.
- `N` volta para a ocorrência anterior.

## 5. Criação, edição e organização

### mkdir

Cria diretórios.

```bash
mkdir Linux
mkdir Linux Curso Aviao
```

O segundo comando cria três pastas separadas:

- `Linux`
- `Curso`
- `Aviao`

### mkdir -p

Cria uma estrutura de diretórios, incluindo os diretórios intermediários.

```bash
mkdir -p Cursos/Hardware/Modulo\ 1/
```

Também é possível usar aspas quando houver espaços:

```bash
mkdir -p "Cursos/Hardware/Modulo 2/"
```

Sem `-p`, o comando falha se algum diretório intermediário ainda não existir.

### Espaços em nomes de arquivos e pastas

Quando um nome tem espaço, você pode:

Usar barra invertida:

```bash
mkdir Modulo\ 1
```

Ou usar aspas:

```bash
mkdir "Modulo 1"
```

### touch

Cria arquivos vazios ou atualiza a data de modificação de um arquivo.

```bash
touch oi.txt
```

### nano

Editor de texto dentro do terminal.

```bash
nano oi.txt
```

Atalhos úteis:

- `Ctrl + O`: salva.
- `Enter`: confirma o nome do arquivo.
- `Ctrl + X`: sai.
- `Ctrl + G`: abre a ajuda do Nano.

### mv

Move ou renomeia arquivos e diretórios.

Renomear diretório:

```bash
mv temporario temp
```

Mover arquivo:

```bash
mv arquivo.txt Documentos/
```

### Abrir arquivos de configuração

Exemplo com `.bashrc`:

```bash
nano ~/.bashrc
```

Também pode ser aberto com outros editores, se instalados:

```bash
gedit ~/.bashrc
code ~/.bashrc
```

Observação: `.bashrc` é um arquivo oculto, por isso começa com ponto.

### chmod +x

Concede permissão de execução a um arquivo, muito usado para scripts `.sh`.

```bash
chmod +x script.sh
```

Depois de dar permissão, execute com:

```bash
./script.sh
```

Explicação:

- `chmod` altera permissões.
- `+x` adiciona permissão de execução.
- `./script.sh` executa um script que está no diretório atual.

Use esse comando apenas em scripts de origem confiável. Antes de executar qualquer `.sh`, leia o conteúdo:

```bash
less script.sh
```

ou:

```bash
nano script.sh
```

## 6. Remoção de arquivos e diretórios

### rmdir

Remove diretórios vazios.

```bash
rmdir Linux/
```

Se o diretório tiver arquivos dentro, o comando falha.

### rm

Remove arquivos.

```bash
rm Linux/oi.txt
```

### rm -rf

Remove diretórios e todo o conteúdo dentro deles.

```bash
rm -rf Cursos/
```

Use com muito cuidado. Esse comando não pergunta novamente por padrão e pode apagar muita coisa rapidamente.

### Alias de segurança para rm

Você pode criar um alias para pedir confirmação antes de apagar:

```bash
alias rm='rm -i'
```

Para remoções maiores, também existe:

```bash
alias rm='rm -I'
```

### Cuidado com espaços perigosos

Nunca execute comandos de remoção se não entender exatamente o caminho informado.

Exemplo perigoso:

```bash
rm -rf /* ~
```

Um espaço no lugar errado pode mudar totalmente o sentido do comando.

## 7. Referência global e curingas

Referência global, ou globbing, é a forma como o shell usa padrões para selecionar arquivos.

### Asterisco: *

Representa qualquer quantidade de caracteres.

Arquivos que terminam com `.conf`:

```bash
ls /etc/*.conf
```

Arquivos que contêm `X` no nome:

```bash
ls /etc/*X*
```

Arquivos que começam com `f`:

```bash
ls /etc/f*
```

Arquivos que terminam com `tab` ou `swd`:

```bash
ls /etc/*{tab,swd}
```

Arquivos com extensão `.conf` ou `.db`:

```bash
ls /etc/*.{conf,db}
```

### Interrogação: ?

Representa exatamente um caractere.

Exemplo:

```bash
ls /etc/?as*
```

Significado:

- primeiro caractere: qualquer um.
- segundo caractere: `a`.
- terceiro caractere: `s`.
- depois disso: qualquer sequência.

Outro exemplo:

```bash
ls /etc/?[a,e,i,o,u]???
```

Esse padrão busca nomes com cinco caracteres, em que o segundo caractere é uma vogal.

### Colchetes: []

Representam uma lista ou intervalo de caracteres possíveis.

Segunda letra entre `a` e `i`:

```bash
ls /etc/f[a-i]*
```

Segunda letra `a` ou `c`:

```bash
ls /etc/p[a,c]*
```

Primeira letra entre `a` e `h`:

```bash
ls /etc/[a-h]*
```

Primeira letra `a`, `c` ou `z`:

```bash
ls /etc/[a,c,z]*
```

Observação:

- `?` representa apenas um caractere.
- `*` representa qualquer quantidade de caracteres.
- `[]` define caracteres possíveis.
- `{}` define padrões ou palavras possíveis.

### Chaves: {}

Usadas para alternar entre padrões.

```bash
ls /etc/?{am,ul}*
```

Significado:

- `?` representa um caractere qualquer.
- depois deve vir `am` ou `ul`.
- depois pode vir qualquer sequência.

Diferença importante:

```bash
ls /etc/?{am,ul}*
ls /etc/?[am,ul]*
```

No primeiro caso, `{am,ul}` trabalha com sequências: `am` ou `ul`.

No segundo caso, `[am,ul]` trabalha com caracteres individuais.

## 8. Pacotes no Debian, Ubuntu e derivados

Distribuições como Debian, Ubuntu, Lubuntu e Linux Mint usam pacotes `.deb`.

Ferramentas importantes:

- `apt`: ferramenta principal para instalar, remover e buscar pacotes.
- `apt-get`: ferramenta tradicional, muito usada em scripts.
- `dpkg`: gerenciador de pacotes de baixo nível do Debian.

### sudo

Executa um comando com permissão de administrador.

```bash
sudo apt update
```

O `sudo` dá permissão elevada apenas para aquela execução específica.

### apt moo

Comando divertido do `apt`.

```bash
apt moo
```

Mostra uma vaquinha no terminal.

### apt update

Atualiza a lista de pacotes disponíveis nos repositórios.

```bash
sudo apt update
```

### apt upgrade

Atualiza pacotes instalados.

```bash
sudo apt upgrade
```

Atualizar listas e pacotes em sequência:

```bash
sudo apt update && sudo apt upgrade -y
```

### apt install

Instala pacotes.

```bash
sudo apt install htop
```

O `htop` é uma ferramenta de monitoramento de processos, memória RAM, swap, núcleos e tarefas em execução. Dentro dele, `F5` coloca a visualização em modo árvore.

### apt remove

Remove pacotes instalados.

```bash
sudo apt remove nome-do-pacote
```

### apt search

Busca pacotes disponíveis nos repositórios configurados.

```bash
apt search editor
apt search htop
```

Serve quando você não sabe o nome exato de um pacote.

### apt clean

Limpa o cache de pacotes baixados.

```bash
sudo apt clean
```

Quando você instala programas com `apt`, arquivos `.deb` podem ficar guardados em:

```text
/var/cache/apt/archives/
```

O `apt clean` apaga esses arquivos do cache.

### apt autoremove

Remove pacotes que foram instalados como dependências e não são mais necessários.

```bash
sudo apt autoremove
```

### Limpeza completa comum

```bash
sudo apt autoremove && sudo apt clean
```

### LibreOffice em português

Se o LibreOffice estiver em inglês, primeiro verifique se o idioma já está instalado:

1. Abra o LibreOffice.
2. Acesse `Tools`.
3. Entre em `Options`.
4. Vá em `Language Settings`.
5. Abra `Languages`.
6. Em `User interface`, escolha `Portuguese (Brazil)`.
7. Reinicie o LibreOffice.

Se a opção de português não aparecer, instale os pacotes de idioma:

```bash
sudo apt update
sudo apt install libreoffice-l10n-pt-br libreoffice-help-pt-br
```

Depois abra novamente o LibreOffice e selecione `Portuguese (Brazil)` nas configurações de idioma.

Também é útil configurar:

- `Locale setting`: Portuguese (Brazil).
- `Default languages for documents`: Portuguese.

Isso melhora menus, ajuda, correção ortográfica e comportamento padrão dos documentos.

## 9. Discos, pendrives e mídias bootáveis

### Conceito de disco, partição e montagem

No Linux, dispositivos também aparecem como arquivos. Um pendrive ou disco externo pode aparecer como:

```text
/dev/sdb
/dev/sdc
/dev/nvme0n1
```

As partições aparecem com números:

```text
/dev/sdb1
/dev/sdb2
```

Diferença importante:

- `/dev/sdb` representa o disco inteiro.
- `/dev/sdb1` representa uma partição dentro do disco.

Para acessar os arquivos, o sistema precisa montar a partição em uma pasta.

Exemplo de ponto de montagem automático:

```text
/media/seu_usuario/NOME_DO_PENDRIVE
```

### lsblk

Mostra discos, pendrives, partições e pontos de montagem.

```bash
lsblk
```

Use sempre antes de formatar, gravar ISO, usar `dd`, `mkfs`, `wipefs` ou `parted`.

Ver também o sistema de arquivos:

```bash
lsblk -f
```

### fdisk -l

Mostra detalhes de discos e partições.

```bash
sudo fdisk -l
```

Esse comando é de leitura, mas ainda assim leia com atenção para identificar corretamente cada disco.

### Sistemas de arquivos para pendrive

| Sistema | Compatibilidade | Uso recomendado |
| --- | --- | --- |
| FAT32 | Linux, Windows, macOS, TVs, carros e consoles | máximo de compatibilidade, mas limita arquivos a 4 GB |
| exFAT | Linux moderno, Windows e macOS | melhor opção geral para pendrives grandes |
| NTFS | Windows e Linux | útil quando o foco é Windows |
| ext4 | Linux | melhor para uso apenas em Linux |

Na maioria dos casos, `exFAT` é a escolha mais prática para pendrive de uso geral.

### Instalar suporte a exFAT

Em sistemas Debian, Ubuntu e derivados modernos, o suporte costuma estar disponível. Se faltar alguma ferramenta:

```bash
sudo apt update
sudo apt install exfatprogs -y
```

### Montar e desmontar pendrive manualmente

Criar pasta de montagem:

```bash
mkdir ~/pendrive
```

Montar:

```bash
sudo mount /dev/sdb1 ~/pendrive
```

Desmontar com segurança:

```bash
sudo umount ~/pendrive
```

ou:

```bash
sudo umount /dev/sdb1
```

Também é possível montar com `udisksctl`:

```bash
udisksctl mount -b /dev/sdb1
```

### Formatar pendrive

Antes de formatar, confirme o dispositivo:

```bash
lsblk -f
```

Desmonte a partição:

```bash
sudo umount /dev/sdb1
```

Formatar em exFAT:

```bash
sudo mkfs.exfat /dev/sdb1
```

Formatar em FAT32:

```bash
sudo mkfs.vfat -F 32 /dev/sdb1
```

Formatar em ext4:

```bash
sudo mkfs.ext4 /dev/sdb1
```

Aviso: `mkfs` apaga os dados da partição escolhida. Se você errar o dispositivo, pode apagar arquivos importantes ou até o sistema.

### Renomear pendrive exFAT

Desmonte primeiro:

```bash
sudo umount /dev/sdb1
```

Aplicar nome:

```bash
sudo exfatlabel /dev/sdb1 HAYNAN_USB
```

Montar novamente:

```bash
udisksctl mount -b /dev/sdb1
```

Conferir:

```bash
lsblk -f
```

### Reset completo de um pendrive

Use apenas quando tiver certeza absoluta de qual é o pendrive.

Fluxo seguro:

1. Identificar com `lsblk`.
2. Desmontar partições.
3. Apagar assinaturas antigas.
4. Criar nova tabela de partição.
5. Criar nova partição.
6. Formatar.
7. Montar e verificar.

Exemplo considerando que o pendrive é `/dev/sdb`:

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

Observação: existe a prática de zerar o início do disco com `dd`, mas ela é destrutiva e normalmente não é necessária para um reset comum. Use `wipefs` e `parted` primeiro.

### Criar pendrive bootável com dd

O `dd` grava uma ISO diretamente no dispositivo.

```bash
sudo dd if=arquivo.iso of=/dev/sdb bs=4M status=progress conv=fsync
```

Pontos críticos:

- use o disco inteiro, como `/dev/sdb`, e não a partição `/dev/sdb1`.
- confirme com `lsblk` antes.
- tudo no pendrive será apagado.
- se errar o disco, pode destruir dados importantes.

### Balena Etcher

Balena Etcher é uma ferramenta gráfica para gravar arquivos ISO em pendrives.

Uso básico:

1. Abra o Balena Etcher.
2. Clique em `Flash from file`.
3. Selecione a ISO.
4. Escolha o pendrive.
5. Clique em `Flash`.
6. Aguarde a validação final.

Vantagens:

- interface simples.
- reduz erros comuns.
- funciona em Linux, Windows e macOS.
- bom para iniciantes.

Cuidados:

- baixe ISOs de sites oficiais.
- confira se o pendrive escolhido está correto.
- não remova o pendrive durante a gravação.

Links oficiais:

- Site: <https://etcher.balena.io>
- GitHub: <https://github.com/balena-io/etcher>

### Ventoy

Ventoy permite preparar um pendrive uma vez e depois copiar várias ISOs para dentro dele.

Fluxo geral:

1. Instale o Ventoy no pendrive.
2. Copie arquivos `.iso` para o pendrive.
3. Reinicie o computador.
4. Dê boot pelo pendrive.
5. Escolha a ISO no menu do Ventoy.

Vantagens:

- permite várias ISOs no mesmo pendrive.
- ótimo para técnicos e estudos.
- evita regravar o pendrive a cada ISO.

Cuidados:

- instalar o Ventoy apaga o pendrive.
- mantenha o Ventoy atualizado.
- use ISOs oficiais.

Link oficial:

- <https://www.ventoy.net>

### MBR, GPT, BIOS e UEFI

Conceitos importantes para boot:

- BIOS/Legacy: padrão antigo de inicialização.
- UEFI: padrão moderno.
- MBR: tabela de partição antiga, comum em máquinas antigas.
- GPT: tabela moderna, comum com UEFI.
- CSM: modo de compatibilidade para boot legado em algumas máquinas UEFI.
- Secure Boot: recurso de segurança do UEFI que pode bloquear alguns sistemas não assinados.

Em notebooks antigos, pode ser necessário:

- ativar `Legacy Boot` ou `CSM`.
- usar particionamento compatível com MBR.
- desativar `Secure Boot`, quando a distribuição não iniciar.

Em máquinas modernas, prefira UEFI com GPT quando possível.

### Instalação Linux leve com Debian XFCE

Objetivo: instalar um sistema leve, estável e adequado para notebooks fracos.

Baixar ISO:

1. Acesse o site oficial do Debian: <https://www.debian.org/download>
2. Baixe a ISO `amd64 netinst`.

Criar pendrive bootável:

1. Use Balena Etcher ou Ventoy.
2. Selecione a ISO oficial do Debian.
3. Grave no pendrive.
4. Remova com segurança.

Configuração de BIOS/UEFI:

- em computador antigo, teste `Legacy Boot` ou `CSM`.
- em computador moderno, prefira UEFI.
- se o boot falhar, verifique `Secure Boot`.
- coloque o pendrive como prioridade de boot.

Durante a instalação:

1. Escolha idioma e teclado.
2. Configure rede.
3. Crie usuário e senha.
4. Escolha o disco com cuidado.
5. Ao selecionar ambiente gráfico, marque `XFCE`.
6. Desmarque ambientes mais pesados que não pretende usar, como GNOME ou KDE.

Pós-instalação:

```bash
sudo apt update && sudo apt upgrade
```

Boas práticas:

- não misture repositórios de distribuições diferentes.
- evite misturar Debian com repositórios de MX, Ubuntu ou Kali.
- mantenha um padrão de instalação para repetir em outras máquinas.
- instale apenas o necessário em notebooks fracos.

### ISOs do Windows e fontes oficiais

Para criar mídia de instalação do Windows, priorize fontes oficiais da Microsoft.

Boas práticas:

- baixe ISOs apenas de páginas oficiais da Microsoft.
- use uma licença válida.
- evite ISOs modificadas, ativadores, cracks e scripts de procedência duvidosa.
- se estiver no Linux, grave a ISO com ferramentas legítimas como Ventoy, Balena Etcher ou `dd`, quando compatível.

Sobre scripts de terceiros que montam ISOs a partir de arquivos baixados:

- podem ensinar conceitos úteis, como `chmod +x`, execução de scripts e dependências.
- não devem ser tratados como fonte oficial.
- só execute se souber ler o script e confiar na origem.

Dependências comuns em fluxos de manipulação de imagem:

```bash
sudo apt install aria2 cabextract wimtools genisoimage chntpw
```

O papel de cada ferramenta:

| Ferramenta | Função |
| --- | --- |
| aria2 | download paralelo e retomável |
| cabextract | extração de arquivos `.cab` |
| wimtools | manipulação de imagens `.wim` |
| genisoimage | criação de imagens ISO |
| chntpw | ferramenta para manutenção offline de registros/senhas Windows; use apenas em máquinas próprias ou autorizadas |

### Kits oficiais de recuperação

Um kit de recuperação é um pendrive bootável com sistemas e ferramentas para diagnóstico, backup, clonagem, particionamento e recuperação.

Política deste manual:

- usar apenas ferramentas oficiais, livres, abertas ou fornecidas por seus próprios mantenedores.
- evitar ISOs modificadas de terceiros, coleções obscuras, cracks, ativadores e ferramentas sem origem clara.
- usar qualquer ferramenta de senha, disco ou recuperação apenas em máquinas próprias ou com autorização explícita.

Ferramentas recomendadas:

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

Cenários comuns:

- sistema não inicia: inicialize uma ISO Live oficial e faça backup antes de reparar.
- troca de HD para SSD: use Rescuezilla ou Clonezilla.
- particionamento: use GParted Live.
- suspeita de RAM com defeito: use Memtest86+.
- manutenção avançada: use SystemRescue.

Fluxo profissional recomendado:

1. Diagnóstico: identifique discos, sintomas e risco.
2. Backup: copie dados importantes antes de alterar partições.
3. Imagem/clonagem: se o disco estiver falhando, clone antes de tentar reparos.
4. Correção: só depois de proteger os dados.
5. Teste final: reinicie, valide arquivos, boot e saúde do disco.

Erros críticos:

- mexer sem backup.
- escolher o disco errado.
- formatar antes de salvar dados.
- usar ferramenta sem entender a consequência.
- trabalhar em equipamento de outra pessoa sem autorização clara.

## 10. Alias e personalização do shell

### O que é alias

Um alias é um apelido para um comando.

Exemplo:

```bash
alias atualizar='sudo apt update && sudo apt upgrade -y'
```

Depois disso, basta digitar:

```bash
atualizar
```

### Alias temporário

Vale apenas enquanto o terminal atual estiver aberto.

```bash
alias ola='echo "Olá, Hainan!"'
```

### Alias permanente

Para deixar permanente, adicione no final do arquivo `~/.bashrc`:

```bash
nano ~/.bashrc
```

Depois recarregue:

```bash
source ~/.bashrc
```

Se usar Zsh, o arquivo é:

```bash
nano ~/.zshrc
source ~/.zshrc
```

### Regras importantes de alias

Correto:

```bash
alias limpar='clear'
```

Errado:

```bash
alias limpar = clear
```

Regras:

- use aspas simples ao redor do comando.
- não coloque espaço antes ou depois do `=`.
- é possível encadear comandos com `&&`.

### Alias úteis

Sistema:

```bash
alias atualizar='sudo apt update && sudo apt upgrade -y'
alias limparcache='sudo apt autoremove && sudo apt clean'
alias desligar='sudo shutdown now'
alias reiniciar='sudo reboot'
```

Navegação:

```bash
alias ..='cd ..'
alias ...='cd ../..'
alias home='cd ~'
alias desk='cd ~/Desktop'
alias dl='cd ~/Downloads'
```

Arquivos e programação:

```bash
alias py='python3'
alias cls='clear'
alias ls='ls --color=auto'
alias ll='ls -lh'
alias la='ls -lha'
alias grep='grep --color=auto'
```

Git:

```bash
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git pull'
```

Rede:

```bash
alias pingg='ping google.com'
alias minhaip='curl ifconfig.me'
alias portas='sudo netstat -tulnp'
```

IA local:

```bash
alias IA='ollama run qwen2.5:0.5b-instruct'
alias IA2='ollama run qwen2.5:1.5b-instruct'
alias IAstop='pkill -9 ollama'
```

### Organizar alias em arquivo separado

Crie um arquivo para seus aliases:

```bash
nano ~/.meusalias
```

No final do `~/.bashrc`, adicione:

```bash
if [ -f ~/.meusalias ]; then
    . ~/.meusalias
fi
```

Depois recarregue:

```bash
source ~/.bashrc
```

### Ver e remover aliases

Ver aliases ativos:

```bash
alias
```

Remover um alias temporariamente:

```bash
unalias nome_do_alias
```

### .bashrc

O `.bashrc` é um arquivo de configuração carregado quando você abre um shell interativo do Bash.

Ele fica em:

```text
/home/seu-usuario/.bashrc
```

Funções comuns do `.bashrc`:

- definir aliases.
- definir variáveis de ambiente.
- criar funções.
- configurar cores do terminal.
- personalizar o prompt.

Exemplo de variável:

```bash
export EDITOR=nano
export PATH=$PATH:$HOME/bin
```

Exemplo de função:

```bash
mkcd () {
  mkdir -p "$1"
  cd "$1"
}
```

Exemplo de prompt colorido:

```bash
PS1='\[\e[1;32m\]\u@\h \[\e[1;34m\]\w \$\[\e[0m\] '
```

### Bash e Zsh

Bash significa `Bourne Again Shell`. Foi criado por Brian Fox em 1989 para o projeto GNU.

Zsh significa `Z Shell`. Foi criado por Paul Falstad em 1990.

Comparação:

- `.bashrc` configura o Bash.
- `.zshrc` configura o Zsh.
- Zsh tem autocompletar avançado, plugins, temas e histórico compartilhado entre abas.
- Bash é clássico, estável e muito comum em distribuições Linux.

Instalar Oh My Zsh:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## 11. Monitoramento do sistema e hardware

### lscpu

Mostra informações da CPU.

```bash
lscpu
```

Informações comuns:

- arquitetura.
- quantidade de CPUs lógicas.
- núcleos.
- threads.
- cache.
- modelo do processador.

### nproc

Mostra a quantidade de processadores lógicos reconhecidos pelo Linux.

```bash
nproc
```

### htop

Mostra uso de CPU, memória, swap e processos.

```bash
htop
```

Instalação:

```bash
sudo apt install htop -y
```

Dentro do `htop`:

- `F5` mostra processos em árvore.
- `F10` sai.

### Frequência dos núcleos em tempo real

```bash
watch -n 1 "cat /proc/cpuinfo | grep 'MHz'"
```

### Temperatura com lm-sensors

Instalar:

```bash
sudo apt update && sudo apt install lm-sensors hddtemp -y
```

Detectar sensores:

```bash
sudo sensors-detect
```

Ver temperaturas:

```bash
sensors
```

Monitorar em tempo real:

```bash
watch -n 2 sensors
```

Sair do monitoramento:

```bash
Ctrl + C
```

### Temperatura do HD ou SSD

```bash
sudo hddtemp /dev/sda
```

Observação: o disco pode ter outro nome, como `/dev/nvme0n1` em SSDs NVMe.

### Interface gráfica para sensores

```bash
sudo apt install psensor -y
```

Depois abra o `Psensor` pelo menu do sistema.

### Nomenclaturas comuns em sensores

Adaptadores:

- `ACPI interface`: dados fornecidos pelo firmware/BIOS do notebook.
- `ISA adapter`: acesso a sensores internos da CPU.
- `SMBus` ou `I2C`: barramentos usados por chips de monitoramento da placa-mãe.

Bateria:

- `BAT0`, `BAT1`: baterias detectadas.
- `in0`: tensão, em volts.
- `power1`: potência instantânea, em watts.
- `current_now`: corrente em microampères.
- `voltage_now`: tensão em microvolts.

CPU:

- `coretemp-isa-0000`: driver de sensores internos de CPUs Intel.
- `Package id 0`: temperatura geral do processador.
- `Core 0`, `Core 1`, `Core N`: temperatura de cada núcleo.

Zonas térmicas:

- `acpitz-acpi-0`: zona térmica definida pelo firmware.
- `temp1`: leitura de temperatura daquela zona.

GPU:

- `amdgpu-pci-0100`: GPU AMD.
- `nouveau-pci-0100`: driver aberto para NVIDIA.
- `temp1`: temperatura da GPU.

Discos:

- `hddtemp`: temperatura de discos via S.M.A.R.T.

Exemplo de saída:

```text
BAT0-acpi-0
Adapter: ACPI interface
in0:           7.40 V
power1:       14.80 W

coretemp-isa-0000
Adapter: ISA adapter
Package id 0:  +55.0°C  (high = +105.0°C, crit = +105.0°C)
Core 0:        +55.0°C  (high = +105.0°C, crit = +105.0°C)
Core 1:        +55.0°C  (high = +105.0°C, crit = +105.0°C)

acpitz-acpi-0
Adapter: ACPI interface
temp1:        +56.0°C
```

### Valores de referência

CPU:

- normal: 40°C a 70°C.
- carga pesada: até 90°C.
- crítico: geralmente entre 100°C e 105°C.

GPU:

- normal: 40°C a 80°C.
- limite comum: perto de 95°C.

Discos:

- normal: 25°C a 50°C.
- crítico: acima de 60°C.

Bateria:

- em notebooks com duas células Li-ion, pode variar por volta de 6V a 8,4V.
- `power1` mostra consumo ou carga em watts.

### CPU em 100%

Uso de CPU em 100% não significa, por si só, que o processador vai queimar.

O risco real é superaquecimento. Processadores modernos reduzem a frequência quando chegam perto do limite térmico, processo chamado `throttling`. Se a temperatura continuar subindo, o sistema pode desligar para se proteger.

Cuidados:

- mantenha o cooler limpo.
- use notebook em superfície ventilada.
- evite abafar entradas e saídas de ar.
- monitore temperaturas com `sensors`, `htop` e `psensor`.

## 12. IA local com Ollama

### Requisitos básicos

Para rodar modelos leves localmente:

- Linux leve, como Lubuntu, Mint XFCE ou Ubuntu.
- 4 GB de RAM com swap configurada.
- internet para instalar e baixar modelos.
- terminal com Bash ou Zsh.

### Instalar Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Verificar versão:

```bash
ollama --version
```

### Baixar modelos leves

Modelo ultra leve:

```bash
ollama pull qwen2.5:0.5b-instruct
```

Modelo um pouco mais inteligente:

```bash
ollama pull qwen2.5:1.5b-instruct
```

### Rodar a IA

```bash
ollama run qwen2.5:0.5b-instruct
```

Ou:

```bash
ollama run qwen2.5:1.5b-instruct
```

### Alias para Ollama

Adicionar no `~/.bashrc`:

```bash
alias IA='OLLAMA_NUM_THREADS=2 OLLAMA_NUM_CTX=512 ollama run qwen2.5:0.5b-instruct -n 192'
alias IA2='OLLAMA_NUM_THREADS=2 OLLAMA_NUM_CTX=768 ollama run qwen2.5:1.5b-instruct -n 256'
```

Recarregar:

```bash
source ~/.bashrc
```

Explicação:

- `IA` roda o modelo mais leve.
- `IA2` roda o modelo mais forte.
- `OLLAMA_NUM_THREADS=2` limita o uso de threads.
- `OLLAMA_NUM_CTX` controla o tamanho do contexto.
- `-n` limita o tamanho da resposta.

### Comandos úteis do Ollama

Listar modelos:

```bash
ollama list
```

Remover modelo:

```bash
ollama rm nome-do-modelo
```

Atualizar ou baixar novamente:

```bash
ollama pull nome-do-modelo
```

### Encerrar execução da IA

Se a IA estiver rodando no terminal atual:

```bash
Ctrl + C
```

Procurar processo:

```bash
ps aux | grep ollama
```

Encerrar pelo PID:

```bash
kill -9 PID
```

### Rodar em segundo plano

```bash
ollama run qwen2.5:1.5b-instruct &
```

Ver processos em background:

```bash
jobs
```

Encerrar job:

```bash
kill %1
```

### Usar tmux

Criar sessão:

```bash
tmux new -s ia
```

Rodar a IA:

```bash
ollama run qwen2.5:1.5b-instruct
```

Sair da sessão sem encerrar:

```text
Ctrl + B, depois D
```

Voltar para a sessão:

```bash
tmux attach -t ia
```

## 13. Comandos rápidos de rede

### ping

Testa conexão com um endereço.

```bash
ping google.com
```

Parar:

```bash
Ctrl + C
```

### curl ifconfig.me

Mostra seu IP público.

```bash
curl ifconfig.me
```

### netstat

Lista portas abertas e processos relacionados.

```bash
sudo netstat -tulnp
```

Se `netstat` não estiver instalado, ele costuma vir no pacote `net-tools`:

```bash
sudo apt install net-tools -y
```

## 14. Boas práticas e cuidados

### Leia antes de executar

Antes de executar comandos com `sudo`, `rm`, `chmod`, `chown` ou redirecionamentos, leia o comando inteiro.

### Use man e tldr

Quando aprender um comando novo:

```bash
man comando
tldr comando
comando --help
```

### Faça testes em pastas temporárias

Para praticar sem medo:

```bash
mkdir ~/teste-linux
cd ~/teste-linux
```

Depois crie arquivos e diretórios de teste:

```bash
touch a.txt b.txt c.log
mkdir pasta1 pasta2
```

### Prefira comandos claros

Quando estiver estudando, prefira escrever comandos completos. Depois que entender, use aliases.

Exemplo:

```bash
ls -l -a -h
```

Depois:

```bash
ls -lah
```

### Documente o que aprender

Sugestão para novos comandos neste manual:

````md
### nome-do-comando

Função:

Exemplo:
```bash
comando exemplo
```

Observações:
- cuidado 1
- cuidado 2
````

## 15. Referência rápida

### Navegação

```bash
pwd
cd ~
cd ..
cd -
ls
ls -lah
```

### Arquivos e diretórios

```bash
mkdir pasta
mkdir -p caminho/completo
touch arquivo.txt
nano arquivo.txt
cat arquivo.txt
less arquivo.txt
mv antigo novo
rm arquivo.txt
rmdir pasta-vazia
rm -rf pasta
```

### Ajuda

```bash
comando --help
man comando
tldr comando
history
```

### Pacotes

```bash
sudo apt update
sudo apt upgrade
sudo apt install pacote
sudo apt remove pacote
apt search palavra
sudo apt autoremove
sudo apt clean
```

### Discos e pendrives

```bash
lsblk
lsblk -f
sudo fdisk -l
sudo umount /dev/sdb1
sudo mkfs.exfat /dev/sdb1
sudo mount /dev/sdb1 ~/pendrive
udisksctl mount -b /dev/sdb1
sudo dd if=arquivo.iso of=/dev/sdb bs=4M status=progress conv=fsync
```

### Mídias bootáveis e recuperação

```bash
chmod +x script.sh
./script.sh
sudo wipefs -a /dev/sdb
sudo parted /dev/sdb --script mklabel msdos
sudo parted /dev/sdb --script mkpart primary 0% 100%
sudo partprobe /dev/sdb
```

### Monitoramento

```bash
lscpu
nproc
htop
sensors
watch -n 2 sensors
```

### Shell e aliases

```bash
nano ~/.bashrc
source ~/.bashrc
alias
unalias nome
```

### Ollama

```bash
ollama --version
ollama list
ollama pull qwen2.5:0.5b-instruct
ollama run qwen2.5:0.5b-instruct
```
