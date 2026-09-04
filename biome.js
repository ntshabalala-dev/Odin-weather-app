{
	"$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
	"vcs": {
		"enabled": true,
		"clientKind": "git",
		"useIgnoreFile": true,
		"defaultBranch": "main"
	},
	"files": {
		"ignoreUnknown": false,
		"includes": ["**", "!**/*.svg"]
	},
	"formatter": {
		"enabled": true,
		"indentStyle": "tab"
	},
	"html": {
		"formatter": {
			"enabled": true
		}
	},
	"linter": {
		"enabled": true,
		"rules": {
			"preset": "recommended",
			"correctness": {
				"noUnusedVariables": "warn"
			},
			"complexity": {
				"noExtraBooleanCast": "error"
			}
		}
	},
	"javascript": {
		"formatter": {
			"quoteStyle": "double"
		}
	},
	"assist": {
		"enabled": true,
		"actions": {
			"source": {
				"organizeImports": "on"
			}
		}
	}
}
