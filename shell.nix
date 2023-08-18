{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell
{
  nativeBuildInputs = with pkgs.buildPackages;
    [
      hurl
      miniserve
      bat
      fnm
      just
      wget
      git
      tree
      unzip
      iproute2
      helix
      cocogitto
      difftastic
      watchexec
      hexyl
      vscodium
      nixd
      nixpkgs-fmt
      nodejs_20
    ];
  shellHook = ''
    codium .
    npm install
  '';
}
