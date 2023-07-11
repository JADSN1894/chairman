#https://zero-to-nix.com/concepts/flakes#registries
#https://zero-to-nix.com/concepts/flakes#inputs

#https://fasterthanli.me/series/building-a-rust-service-with-nix/part-9
#https://fasterthanli.me/series/building-a-rust-service-with-nix/part-10

#https://nixos.org/manual/nix/stable/language/builtins.html
#https://nixos.wiki/wiki/Packaging/Binaries

#nix-instantiate --strict --eval 

{
  inputs = {
    nixpkgs.url = "nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        packages = with pkgs; [
          fnm
          zellij
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
        ];
    in
      {
        devShell = pkgs.mkShell {
          buildInputs = packages;
        };
      });
}